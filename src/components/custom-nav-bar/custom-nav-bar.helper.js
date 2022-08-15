import { HttpGet } from "../../services/api-services";
import { BASE_URI, GET_USER, LOGOUT, RESET_PASSWORD } from "../../constants/endpoints";

export const fetchLoggedInUserDetails = async () => {
  try {
      let credentials = "Bearer " + localStorage.getItem("token");
      let apiUrl = BASE_URI + GET_USER + "/" + localStorage.getItem("username");
      let headers = {
          "Authorization": credentials
      }
      let response = await HttpGet(apiUrl, {}, headers)
      return response.data.userDtos[0];
  } catch (e) {
      throw e;
  }
}

export const logout = async () => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + LOGOUT + "/" + localStorage.getItem("username");
        let headers = {
            "Authorization": credentials
        }
        let response = await HttpGet(apiUrl, {}, headers)
        return response.data.status;
    } catch (e) {
        throw e;
    }
  }
  