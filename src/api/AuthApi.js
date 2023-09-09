import { API_CONTENT_TYPE, API_USER_FORGOT_PASSWORD, API_USER_LOGIN, API_USER_RESET_PASSWORD } from "../common/AppConstant";
import { api } from "../common/AppCommon";


api.defaults.headers.common["Content-Type"] = API_CONTENT_TYPE;

export const login = async (data) => {
    var result = null;
    const response = await api.post(API_USER_LOGIN, data)
        .then((resp) => result = resp.data)
        .catch((err) => { result = err.response.data });

    return result;
}

export const resetPassword = async (data) => {
    var result = null;
    const response = await api.post(API_USER_RESET_PASSWORD, data)
        .then((resp) => result = resp.data)
        .catch((err) => { result = err.response.data });

    return result;
}

export const forgotPassword = async (data) => {
    var result = null;
    const response = await api.post(API_USER_FORGOT_PASSWORD, data)
        .then((resp) => result = resp.data)
        .catch((err) => { result = err.response.data });

    return result;
}