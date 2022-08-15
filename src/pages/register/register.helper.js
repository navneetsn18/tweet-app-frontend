import { HttpPost } from "../../services/api-services";
import { BASE_URI, REGISTER } from "../../constants/endpoints";

export const register = async (values) => {
    try {
        let apiUrl = BASE_URI + REGISTER;
        await HttpPost(apiUrl,
            {
                "email": values.emailId,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "password": values.password,
                "username": values.username
            })
    } catch (e) {
        throw e;
    }
}

