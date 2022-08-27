import { HttpGet, HttpPost , HttpPut} from "../../services/api-services";
import { BASE_URI, ALL_TWEETS, GET_USER, POST_TWEET,REPLY_TWEET ,LIKE_TWEETS} from "../../constants/endpoints";

export const fetchLoggedInUserDetails = async () => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + GET_USER + localStorage.getItem("username");
        console.log(apiUrl)
        let headers = {
            "Authorization": credentials
        }
        let response = await HttpGet(apiUrl, {}, headers)
        return response.data.userDtos[0];
    } catch (e) {
        throw e;
    }
}

export const fetchAllTweets = async () => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + ALL_TWEETS;
        let headers = {
            "Authorization": credentials
        }
        let response = await HttpGet(apiUrl, {}, headers)
        return response.data.tweetDtos;
    } catch (e) {
        throw e;
    }
}

export const postTweet = async (tweetMessage) => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let headers = {
            "Authorization": credentials
        }
        let apiUrl = BASE_URI + POST_TWEET;
        await HttpPost(apiUrl, {
            username : localStorage.getItem("username"),
            tweet: tweetMessage
        }, headers)
    } catch (e) {
        throw e;
    }
}
export const postReplyTweet = async (id,reply) => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let headers = {
            "Authorization": credentials
        }

        let apiUrl = BASE_URI + REPLY_TWEET ;
        await HttpPost(apiUrl, {
            "id": id,
            "reply": [
              {
                "replyMsg": reply,
                "username": localStorage.getItem("username")
              }
            ]
          }, headers)
    } catch (e) {
        throw e;
    }
}

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

