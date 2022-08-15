import { HttpGet, HttpPost } from "../../services/api-services";
import { BASE_URI, RESET_PASSWORD } from "../../constants/endpoints";

export const resetPassword = async (password) => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let headers = {
            "Authorization": credentials
        }
        let apiUrl = BASE_URI + RESET_PASSWORD;
        let response = await HttpPost(apiUrl, {
            username: localStorage.getItem("username"),
            password: password
        },headers)
        if(response.data.statusMessage == "No User Found!"){
            throw "User does not exist"
        }
    } catch (e) {
        throw e;
    }
}

