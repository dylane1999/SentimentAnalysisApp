import axios from "axios";


async function getBackendData(tweetId) {
    /**
     * function to complete the call to the backend.
     * 
     * @param tweetId : ID of the tweet to retrieve. 
     * @returns the response from the backend.
     */
    let backendResponse = await axios.post(`/analyze/${tweetId}`);
    return backendResponse
}


export default getBackendData;