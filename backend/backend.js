import express from "express"; // backend api
import axios from "axios"; // requests!

// MIDDLEWARE!
import cors from "cors"; // enforce CORS, will be set to frontend URL when deployed
import morgan from "morgan"; // useful for tracking request logs
import helmet from "helmet"; // ensures max security for server
import StatusCodes from "http-status-codes"; // status codes!
import bodyParser from "body-parser";
import language from "@google-cloud/language";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const cors_conf = {
  origin: ["http://localhost:5000"], // ! temporary
  methods: ["POST"],
};

app.use(morgan("common"));
app.use(cors(cors_conf));
app.use(helmet());
app.use(bodyParser.json()); // for parsing application/json
app.listen(5000, function () {
  console.log("server starting...");
});

const twitterBaseUrl = "https://api.twitter.com/2";

const instance = axios.create({
  baseURL: twitterBaseUrl,
  headers: { Authorization: `Bearer ${process.env.bearer_token}` },
});

// analyze/id/ endpoint...
app.post("/analyze/:id", async function (request, response) {
  const id_length = request.params.id.length;
  const finalResponseObj = {}; // response object for frontend, containing two keys: "Google" and "Twitter".

  if (id_length !== 19) {
    response.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid ID.",
      message: "ID must be a 19-character long Tweet ID.",
    });
  } else {
    let tweetId = request.params.id;
    let twitterFormattedUrl = buildURL(tweetId);
    console.log(`URL for Twitter Request: ${twitterFormattedUrl}`);
    let responseFromTwitter = await instance.get(twitterFormattedUrl);
    console.log("Response from Twitter:\n");
    console.log(responseFromTwitter.data);
    let responseForGoogle = await parseTwitterResponse(responseFromTwitter);
    console.log("Response for Google NLP API:\n");
    console.log(responseForGoogle);

    finalResponseObj["twitter"] = responseForGoogle;

    if (responseForGoogleIsError(responseForGoogle)) {
      response.status(StatusCodes.BAD_REQUEST).json(responseForGoogle);
    } else {
      // ! implement request for Google NLP API here...
      try {
        let googleNlpResponse = await analyzeSentiment(responseForGoogle.tweet.text);

        if (typeof googleNlpResponse === "undefined") {
          response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "The Response from the Google NLP API is undefined.",
            message:
              "Try again, and if this issue persists contact support or open an issue on GitHub.",
          });
        } else {
          // ! DEBUGGING START
          console.log("Google NLP Response:\n");
          console.log(
            `Document Sentiment\n1. MAGNITUDE: ${googleNlpResponse.documentSentiment.magnitude}\n2. SCORE: ${googleNlpResponse.documentSentiment.score}`
          );
          console.log("Sentence Sentiment:\n");
          console.log(googleNlpResponse.sentences);
          // ! DEBUGGING END

          finalResponseObj["google"] = googleNlpResponse;

          response.status(StatusCodes.OK).json(finalResponseObj); // for now, sending back entire payload from google...
        }
      } catch (error) {
        /**
         * This should only ever happen if:
         * 1. Something is going on with the Google NLP API
         * .
         * .
         * .
         * ¯\_(ツ)_/¯
         */

        response.status(StatusCodes.BAD_GATEWAY).json({
          error: error.message,
          message:
            "Try again, and if this issue persists contact support or open an issue on GitHub.",
        });
      }
    }
  }
});

async function parseTwitterResponse(twitterResponse) {
  /**
   * parses the JSON data retrieved from Twitters response object.
   *
   * @param twitterResponse -> ``JSON response``, the response from Twitter.
   * @returns : an Object containing data about the tweet (tweet text, author, time, etc...)
   */

  console.log("parsing twitter response...");
  if (tweetIdIsValid(twitterResponse)) {
    try {
      let twitterJsonData = twitterResponse.data;
      let tweetText = await extractText(twitterJsonData);
      let tweetId = await extractId(twitterJsonData);
      let tweetCreatedAtTime = await extractCreatedTime(twitterJsonData);
      let userProfileName = await extractUsername(twitterJsonData);
      let userActualName = await extractUserActualName(twitterJsonData);
      let userProfileImageUrl = await extractProfileImageUrl(twitterJsonData);
      // ! extract user photo, created at time here
      console.log(tweetId, tweetText);
      return {
        tweet: {
          text: tweetText,
          id: tweetId,
          createdTime: tweetCreatedAtTime,
        },
        user: {
          name: userActualName,
          profileName: userProfileName,
          url: userProfileImageUrl
        }
      };
    } catch (error) {
      console.error(error.message);
      return {
        error: error.message,
        full_stack: error,
      };
    }
  } else {
    return {
      message: tweetResponse.errors[0].title,
      error: tweetResponse.errors[0].detail,
    };
  }
}
function buildURL(tweetId) {
  /**
   * helper function that builds the twitter URL to send the GET request to.
   *
   * @param tweetId -> ``string`` the ID of the tweet to request.
   * @returns fully-formatted Twitter URL.
   */
  let endpointAndParam = `/tweets?ids=${tweetId}&tweet.fields=created_at&expansions=author_id&user.fields=created_at,profile_image_url`;

  return twitterBaseUrl.concat(endpointAndParam);
}

function extractId(tweetResponse) {
  /**
   * extract the tweet ID from the tweet response object.
   *
   * @param tweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the ID of the first tweet in the response object.
   * */
  return tweetResponse.data[0].id;
}

function extractText(tweetResponse) {
  /**
   * extract the tweet text from the tweet response object.
   *
   * @param tweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the text of the first tweet in the response object.
   * */
  return tweetResponse.data[0].text;
}

function extractCreatedTime(tweetResponse) {
  /**
   * extract the tweet created time from the tweet response object.
   *
   * @param tweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the time the tweet was created.
   * */
    return tweetResponse.data[0].created_at;
}
function extractUsername(tweetResponse) {
  /**
   * extract the username of the individual who tweeted the tweet from the tweet response object.
   *
   * @param tweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the username of the creator of the tweet.
   * */
    return tweetResponse.includes.users[0].username;
}
function extractProfileImageUrl(tweetResponse) {
  /**
   * extract the profile Image URL of thecreator of the tweet from the tweet response object.
   *
   * @param tweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the profile image url of the creator of the tweet.
   * */
    return tweetResponse.includes.users[0].profile_image_url;
}

function extractUserActualName(tweetResponse) {
  /**
   * extract the actual name (not sluggified) of the individual who tweeted the tweet from the tweet response object.
   *
   * @param tweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the username of the creator of the tweet.
   * */
  return tweetResponse.includes.users[0].name;
}

function tweetIdIsValid(tweetResponse) {
  /**
   * helper function to check if the tweet 19-character ID passed is valid.
   *
   * @param tweetResponse -> the response from Twitters API /2/tweets?ids
   * @returns : true is a key named "data" exists, false otherwise.
   */
  return tweetResponse.data ? true : false;
}

function responseForGoogleIsError(responseForGoogle) {
  /**
   * check if response sent to frontend is 200 OK...
   *
   * If the type is an object then it is an error and 400 BAD REQUEST should be sent. Otherwise, 200 OK.
   *
   * It is important to check that the value is ALSO not null, because null type in JS is an object.
   * In this context, .text should never be null.
   * https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
   *
   * @param responseForGoogle -> the response being sent to the frontend.
   * @returns boolean value denoting whether the response is valid or not. true is error, false is not.
   *
   */
  return (
    typeof responseForGoogle.text === "object" &&
    responseForGoogle.text !== null
  );
}

async function analyzeSentiment(doc) {
  /**
   * function to make request to google NLP api
   *
   * @param doc -> the text that will be analyzed
   * @returns : result from the api, containing a score and magnitude
   */
  try {
    // Instantiates a client
    const client = new language.LanguageServiceClient();

    // The text to analyze
    const text = doc;

    const document = {
      content: text,
      type: "PLAIN_TEXT",
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    if (result) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
}
