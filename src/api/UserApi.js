import {
    API_CONTENT_TYPE, API_USER_ADD_USER,
    API_USER_DELETE_USER, API_USER_GET_USER,
    API_USER_UPDATE_USER,
    SESSION_TOKENS
} from "../common/AppConstant";
import { api } from "../common/AppCommon";


api.defaults.headers.common["Content-Type"] = API_CONTENT_TYPE;
var tokens = JSON.parse(localStorage.getItem(SESSION_TOKENS));

var tokenHeader = { Authorization: (tokens == null ? '' : `Bearer ${tokens.accessToken}`) }

const getUnAuthoriseObjectResponse = () => {
    var obj = new Object();
    obj.status = 401;
    obj.data = null;
    obj.message = 'User is not Authorised!';
    obj.returnValue = '';
    return obj;
}


export const getUsers = async () => {
    var result = null;
    const response = await api.get(API_USER_GET_USER, { headers: tokenHeader })
        .then((resp) => result = resp.data)
        .catch((err) => {
            if (err.response.status == 401) {
                result = getUnAuthoriseObjectResponse();
            }
            else
                result = err.response.data
        });
    return result;
};

export const addUser = async (obj) => {
    var result = null;
    const response = await api.post(API_USER_ADD_USER, obj, { headers: tokenHeader })
        .then((resp) => result = resp.data)
        .catch((err) => {
            if (err.response.status == 401) {
                result = getUnAuthoriseObjectResponse();
            }
            else
                result = err.response.data
        })
    return result;
}

export const updateUser = async (obj) => {
    var result = null;
    const response = await api.post(API_USER_UPDATE_USER, obj, { headers: tokenHeader })
        .then((resp) => result = resp.data)
        .catch((err) => {
            if (err.response.status == 401) {
                result = getUnAuthoriseObjectResponse();
            }
            else
                result = err.response.data
        })
    return result;
}

export const deleteUser = async (id) => {
    var result = null;
    const response = await api.delete(API_USER_DELETE_USER + '/' + id, { headers: tokenHeader })
        .then((resp) => result = resp.data)
        .catch((err) => {
            if (err.response.status == 401) {
                result = getUnAuthoriseObjectResponse();
            }
            else
                result = err.response.data
        })
    return result;
}