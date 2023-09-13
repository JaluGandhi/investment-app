import {
    API_CONTENT_TYPE,
    SESSION_TOKENS,
    API_DEMAT_ACCOUNT_ADD_BROKER,
    API_DEMAT_ACCOUNT_DELETE_BROKER,
    API_DEMAT_ACCOUNT_GET_BROKERS,
    API_DEMAT_ACCOUNT_UPDATE_BROKER,
    API_DEMAT_ACCOUNT_GET_DEPOSITORY_PARTICIPANTS,
    API_DEMAT_ACCOUNT_ADD_DEPOSITORY_PARTICIPANT,
    API_DEMAT_ACCOUNT_UPDATE_DEPOSITORY_PARTICIPANT,
    API_DEMAT_ACCOUNT_DELETE_DEPOSITORY_PARTICIPANT,
    API_DEMAT_ACCOUNT_GET_DEMAT_ACCOUNTS,
    API_DEMAT_ACCOUNT_ADD_DEMAT_ACCOUNT,
    API_DEMAT_ACCOUNT_UPDATE_DEMAT_ACCOUNT,
    API_DEMAT_ACCOUNT_DELETE_DEMAT_ACCOUNT,
    API_DEMAT_ACCOUNT_GET_BROKERS_BY_DEPOSITORY_PARTICIPANT_ID
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

//START: Api Broker
export const getBrokers = async () => {
    var result = null;
    const response = await api.get(API_DEMAT_ACCOUNT_GET_BROKERS, { headers: tokenHeader })
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

export const getBrokersByDepositoryParticipantId = async (id) => {
    var result = null;
    const response = await api.get(API_DEMAT_ACCOUNT_GET_BROKERS_BY_DEPOSITORY_PARTICIPANT_ID + '/' + id, { headers: tokenHeader })
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

export const addBroker = async (obj) => {
    var result = null;
    const response = await api.post(API_DEMAT_ACCOUNT_ADD_BROKER, obj, { headers: tokenHeader })
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

export const updateBroker = async (obj) => {
    var result = null;
    const response = await api.post(API_DEMAT_ACCOUNT_UPDATE_BROKER, obj, { headers: tokenHeader })
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

export const deleteBroker = async (id) => {
    var result = null;
    const response = await api.delete(API_DEMAT_ACCOUNT_DELETE_BROKER + '/' + id, { headers: tokenHeader })
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
//END

//START: Api Depository Participant
export const getDepositoryParticipants = async () => {
    var result = null;
    const response = await api.get(API_DEMAT_ACCOUNT_GET_DEPOSITORY_PARTICIPANTS, { headers: tokenHeader })
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

export const addDepositoryParticipant = async (obj) => {
    var result = null;
    const response = await api.post(API_DEMAT_ACCOUNT_ADD_DEPOSITORY_PARTICIPANT, obj, { headers: tokenHeader })
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

export const updateDepositoryParticipant = async (obj) => {
    var result = null;
    const response = await api.post(API_DEMAT_ACCOUNT_UPDATE_DEPOSITORY_PARTICIPANT, obj, { headers: tokenHeader })
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

export const deleteDepositoryParticipant = async (id) => {
    var result = null;
    const response = await api.delete(API_DEMAT_ACCOUNT_DELETE_DEPOSITORY_PARTICIPANT + '/' + id, { headers: tokenHeader })
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

//END

//START: Api Demat
export const getDematAccounts = async (userId) => {
    var result = null;
    const response = await api.get(API_DEMAT_ACCOUNT_GET_DEMAT_ACCOUNTS + '/' + userId, { headers: tokenHeader })
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

export const addDematAccount = async (obj) => {
    var result = null;
    const response = await api.post(API_DEMAT_ACCOUNT_ADD_DEMAT_ACCOUNT, obj, { headers: tokenHeader })
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

export const updateDematAccount = async (obj) => {
    var result = null;
    const response = await api.post(API_DEMAT_ACCOUNT_UPDATE_DEMAT_ACCOUNT, obj, { headers: tokenHeader })
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

export const deleteDematAccount = async (id) => {
    var result = null;
    const response = await api.delete(API_DEMAT_ACCOUNT_DELETE_DEMAT_ACCOUNT + '/' + id, { headers: tokenHeader })
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

//END