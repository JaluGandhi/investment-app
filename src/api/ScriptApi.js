import {
    API_CONTENT_TYPE,
    API_SCRIPT_ADD_SCRIPT,
    API_SCRIPT_ADD_TRANSACTION,
    API_SCRIPT_ADD_USER_SCRIPT,
    API_SCRIPT_GET_SCRIPTS,
    API_SCRIPT_GET_TRANSACTIONS,
    API_SCRIPT_GET_USER_SCRIPTS,
    API_SCRIPT_UPDATE_SCRIPT,
    API_SCRIPT_UPDATE_TRANSACTION,
    API_SCRIPT_UPDATE_USER_SCRIPT,
    SESSION_TOKENS
} from "../common/AppConstant";
import { api } from "./AxiosConfig";


// api.defaults.headers.common["Content-Type"] = API_CONTENT_TYPE;
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

//Script
export const getScripts = async () => {
    var result = null;
    const response = await api.get(API_SCRIPT_GET_SCRIPTS, { headers: tokenHeader })
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

export const addScript = async (obj) => {
    var result = null;
    const response = await api.post(API_SCRIPT_ADD_SCRIPT, obj, { headers: tokenHeader })
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

export const updateScript = async (obj) => {
    var result = null;
    const response = await api.post(API_SCRIPT_UPDATE_SCRIPT, obj, { headers: tokenHeader })
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

//User Script
export const getUserScripts = async (userId) => {
    var result = null;
    const response = await api.get(API_SCRIPT_GET_USER_SCRIPTS + '/' + userId, { headers: tokenHeader })
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

export const addUserScript = async (obj) => {
    var result = null;
    const response = await api.post(API_SCRIPT_ADD_USER_SCRIPT, obj, { headers: tokenHeader })
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

export const updateUserScript = async (obj) => {
    var result = null;
    const response = await api.post(API_SCRIPT_UPDATE_USER_SCRIPT, obj, { headers: tokenHeader })
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

//Script Transation
export const getScriptTransactions = async (userId) => {
    var result = null;
    const response = await api.get(API_SCRIPT_GET_TRANSACTIONS, { headers: tokenHeader })
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

export const addScriptTransation = async (obj) => {
    var result = null;
    const response = await api.post(API_SCRIPT_ADD_TRANSACTION, obj, { headers: tokenHeader })
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

export const updateScriptTransation = async (obj) => {
    var result = null;
    const response = await api.post(API_SCRIPT_UPDATE_TRANSACTION, obj, { headers: tokenHeader })
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