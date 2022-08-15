import { HttpGet } from "../../services/api-services";
import { BASE_URI, ALL_USERS } from "../../constants/endpoints";

export const fetchAllUsers = async () => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + ALL_USERS;
        let headers = {
            "Authorization": credentials
        }
        let response = await HttpGet(apiUrl, {}, headers)
        return response.data.userDtos;
    } catch (e) {
        throw e;
    }
}

