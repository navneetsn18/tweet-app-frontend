import { HttpGet, HttpDelete , HttpPut} from "../../services/api-services";
import { BASE_URI, LIKE_TWEETS, SEARCH_TWEETS ,DELETE_TWEET, UPDATE_TWEET} from "../../constants/endpoints";

export const likeTweet = async (id) => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let headers = {
            "Authorization": credentials
        }
        let apiUrl = BASE_URI + LIKE_TWEETS + "/" + localStorage.getItem("username") + "/" + id;
        await HttpPut(apiUrl, {}, headers)
    } catch (e) {
        throw e;
    }
}

export const fetchMyTweets = async () => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + SEARCH_TWEETS + "/" + localStorage.getItem("username");
        let headers = {
            "Authorization": credentials
        }
        let response = await HttpGet(apiUrl, {}, headers)
        return response.data.tweetDtos;
    } catch (e) {
        throw e;
    }
}

export const deleteTweet = async (username, tweetId) => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + DELETE_TWEET + "/" + username + "/" + tweetId;
        let headers = {
            "Authorization": credentials
        }
       await HttpDelete(apiUrl, {}, headers)
    } catch (e) {
        throw e;
    }
}

export const updateTweet = async (data) => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + UPDATE_TWEET;
        let headers = {
            "Authorization": credentials
        }
       await HttpPut(apiUrl, data, headers)
        
    } catch (e) {
        throw e;
    }
}

