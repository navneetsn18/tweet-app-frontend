import { HttpGet } from "../../services/api-services";
import { BASE_URI, FORGOT_PASSWORD } from "../../constants/endpoints";

export const forgotPassword = async (username) => {
    try {
        let apiUrl = BASE_URI + FORGOT_PASSWORD + "/" + username;
        let response = await HttpGet(apiUrl)
        if (response.data.statusMessage === "USER NOT FOUND") {
            throw new Error("User does not exist")
        }
    } catch (e) {
        throw e;
    }
}

