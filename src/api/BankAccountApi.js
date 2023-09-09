import {
    API_BANK_ACCOUNT_ADD_BANK_ACCOUNT,
    API_BANK_ACCOUNT_DELETE_BANK_ACCOUNT,
    API_BANK_ACCOUNT_GET_BANK_ACCOUNTS,
    API_BANK_ACCOUNT_UPDATE_BANK_ACCOUNT,
    API_CONTENT_TYPE,
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

export const getBankAccounts = async (userId) => {
    var result = null;
    const response = await api.get(API_BANK_ACCOUNT_GET_BANK_ACCOUNTS + '/' + userId, { headers: tokenHeader })
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

export const addBankAccount = async (obj) => {
    var result = null;
    const response = await api.post(API_BANK_ACCOUNT_ADD_BANK_ACCOUNT, obj, { headers: tokenHeader })
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

export const updateBankAccount = async (obj) => {
    var result = null;
    const response = await api.post(API_BANK_ACCOUNT_UPDATE_BANK_ACCOUNT, obj, { headers: tokenHeader })
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

export const deleteBankAccount = async (id) => {
    var result = null;
    const response = await api.delete(API_BANK_ACCOUNT_DELETE_BANK_ACCOUNT + '/' + id, { headers: tokenHeader })
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