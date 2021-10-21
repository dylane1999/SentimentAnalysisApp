import express from "express"; // backend api
import axios from "axios"; // requests!

// MIDDLEWARE!
import cors from "cors"; // enforce CORS, will be set to frontend URL when deployed
import morgan from "morgan"; // useful for tracking request logs
import helmet from "helmet"; // ensures max security for server
import language from "@google-cloud/language";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.listen(80, function () {
  console.log("server listening on port 80 ...");
});

const twitterBaseUrl = "https://api.twitter.com/2";

const axiosInstance = axios.create({
  baseURL: twitterBaseUrl,
  headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
});

app.get("/health", async function (request, response) {
  response.status(200).json({
    status: "up",
  });
});

// analyze/id/ endpoint...
app.get("/analyze/:id", async function (request, response) {
  const tweetIdLength = request.params.id.length;
  const result = {}; // response object for frontend, containing two keys: "Google" and "Twitter".

  if (tweetIdLength !== 19) {
    response.status(400).json({
      error: "Invalid ID.",
      message: "ID must be a 19-character long Tweet ID.",
    });
  } else {
    let tweetId = request.params.id;
    let twitterFormattedUrl = buildURLFor(tweetId);
    console.log(`URL for Twitter Request: ${twitterFormattedUrl}`);
    let responseFromTwitter;
    try {
      responseFromTwitter = await axiosInstance.get(twitterFormattedUrl);
    } catch (error) {
      response.status(500).json({
        error: "The Response from the twitter API is unsuccessful",
        message:
          "Try again, and if this issue persists contact support or open an issue on GitHub.",
      });
    }
    console.log("Response from Twitter:\n");
    console.log(responseFromTwitter.data);
    let googlePayload = await parse(responseFromTwitter);
    console.log("Response for Google NLP API:\n");
    console.log(googlePayload);

    result["twitter"] = googlePayload;

    if (isErrorFor(googlePayload)) {
      response.status(400).json(googlePayload);
    } else {
      // ! implement request for Google NLP API here...
      try {
        let googleNlpResponse = await analyzeSentimentFor(
          googlePayload.tweet.text
        );

        if (typeof googleNlpResponse === "undefined") {
          response.status(500).json({
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

          result["google"] = googleNlpResponse;

          response.status(200).json(result); // for now, sending back entire payload from google...
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

        response.status(502).json({
          error: error.message,
          message:
            "Try again, and if this issue persists contact support or open an issue on GitHub.",
        });
      }
    }
  }
});

async function parse(aTwitterResponse) {
  /**
   * parses the JSON data retrieved from Twitters response object.
   *
   * @param aTwitterResponse -> ``JSON response``, the response from Twitter.
   * @returns : an Object containing data about the tweet (tweet text, author, time, etc...)
   */

  console.log("parsing twitter response...");
  if (validTweetIdFor(aTwitterResponse)) {
    try {
      let twitterJsonData = aTwitterResponse.data;
      let tweetText = await extractTextFrom(twitterJsonData);
      let tweetId = await extractIdFrom(twitterJsonData);
      let tweetCreatedAtTime = await extractCreatedTimeFrom(twitterJsonData);
      let userProfileName = await extractUsernameFrom(twitterJsonData);
      let userActualName = await extractUserActualNameFrom(twitterJsonData);
      let userProfileImageUrl = await extractProfileImageUrlFrom(
        twitterJsonData
      );
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
          url: userProfileImageUrl,
        },
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
function buildURLFor(aTweetId) {
  /**
   * helper function that builds the twitter URL to send the GET request to.
   *
   * @param aTweetId -> ``string`` the ID of the tweet to request.
   * @returns fully-formatted Twitter URL.
   */
  let endpointAndParam = `/tweets?ids=${aTweetId}&tweet.fields=created_at&expansions=author_id&user.fields=created_at,profile_image_url`;

  return twitterBaseUrl.concat(endpointAndParam);
}

function extractIdFrom(aTweetResponse) {
  /**
   * extract the tweet ID from the tweet response object.
   *
   * @param aTweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the ID of the first tweet in the response object.
   * */
  return aTweetResponse.data[0].id;
}

function extractTextFrom(aTweetResponse) {
  /**
   * extract the tweet text from the tweet response object.
   *
   * @param aTweetResponse -> tweet response object returned from GET request sent to /tweets?ids=[ids...]
   * @returns : the text of the first tweet in the response object.
   * */
  return aTweetResponse.data[0].text;
}

function extractCreatedTimeFrom(aTweetResponse) {
  /**
   * extract the tweet created time from the tweet response object.
   *
   * @param aTweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the time the tweet was created.
   * */
  return aTweetResponse.data[0].created_at;
}
function extractUsernameFrom(aTweetResponse) {
  /**
   * extract the username of the individual who tweeted the tweet from the tweet response object.
   *
   * @param aTweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the username of the creator of the tweet.
   * */
  return aTweetResponse.includes.users[0].username;
}
function extractProfileImageUrlFrom(aTweetResponse) {
  /**
   * extract the profile Image URL of the creator of the tweet from the tweet response object.
   *
   * @param aTweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the profile image url of the creator of the tweet.
   * */
  return aTweetResponse.includes.users[0].profile_image_url;
}

function extractUserActualNameFrom(aTweetResponse) {
  /**
   * extract the actual name (not sluggified) of the individual who tweeted the tweet from the tweet response object.
   *
   * @param aTweetResponse -> tweet response object from GET request sent to /tweets?ids=[ids...]
   * @returns : the username of the creator of the tweet.
   * */
  return aTweetResponse.includes.users[0].name;
}

function validTweetIdFor(aTweetResponse) {
  /**
   * helper function to check if the tweet 19-character ID passed returns valid data.
   *
   * @param aTweetResponse -> the response from Twitters API /2/tweets?ids GET request
   * @returns : true is a key named "data" exists, false otherwise.
   */
  return aTweetResponse.data ? true : false;
}

function isErrorFor(aGooglePayload) {
  /**
   * check if response is valid data type containing plain text...
   *
   * If the type is an object then it is an error and 400 BAD REQUEST should be sent. Otherwise, 200 OK.
   *
   * It is important to check that the value is ALSO not null, because null type in JS is an object.
   * In this context, .text should never be null.
   * https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
   *
   * @param aGooglePayload -> the response being sent to the frontend, which is subsequently used for the Google NLP request.
   * @returns boolean value denoting whether the response is valid or not. true is error, false is not.
   *
   */
  return (
    typeof aGooglePayload.text === "object" && aGooglePayload.text !== null
  );
}

async function analyzeSentimentFor(aPlainTextDoc) {
  /**
   * function to make request to google NLP api
   *
   * @param aPlainTextDoc -> the plain text that will be analyzed
   * @returns : result from the api, containing a score and magnitude
   */
  try {
    // Instantiates a client
    const client = new language.LanguageServiceClient();

    const document = {
      content: aPlainTextDoc,
      type: "PLAIN_TEXT",
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;

    console.log(`Text: ${aPlainTextDoc}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    if (result) {
      return result;
    }
  } catch (err) {
    console.log(err);
  }
}
