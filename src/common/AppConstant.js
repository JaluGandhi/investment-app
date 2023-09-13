export const CURRENT_YEAR = new Date().getFullYear();
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//SWAL
export const SWAL_TYPE_ERROR = 'error';
export const SWAL_TYPE_SUCCESS = 'success';
export const SWAL_TITLE_ERROR = 'Oops!';
export const SWAL_TITLE_SUCCESS = 'Successful';
//end


//App Rout
export const APP_ROUTE_LOGIN = 'login';
export const APP_ROUTE_LOGIN_PATH = '/login';
export const APP_ROUTE_REST_PASSWORD = 'reset-password';
export const APP_ROUTE_REST_PASSWORD_PATH = '/reset-password';
export const APP_ROUTE_DASHBOARD = 'dashboard';
export const APP_ROUTE_DASHBOARD_PATH = '/dashboard';
export const APP_ROUTE_USERS = 'users';
export const APP_ROUTE_USERS_PATH = '/users';
export const APP_ROUTE_BANK_ACCOUNT = 'bank-accounts';
export const APP_ROUTE_BANK_ACCOUNT_PATH = '/bank-accounts';
export const APP_ROUTE_BROKER = 'brokers';
export const APP_ROUTE_BROKER_PATH = '/brokers';
export const APP_ROUTE_DEPOSITORY_PARTICIPANT = 'depository-participants';
export const APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH = '/depository-participants';
export const APP_ROUTE_DEMAT_ACCOUNT = 'demat-accounts';
export const APP_ROUTE_DEMAT_ACCOUNT_PATH = '/demat-accounts';
export const APP_ROUTE_SCRIPT = 'scripts';
export const APP_ROUTE_SCRIPT_PATH = '/scripts';
export const APP_ROUTE_USER_SCRIPT = 'user-scripts';
export const APP_ROUTE_USER_SCRIPT_PATH = '/user-scripts';
export const APP_ROUTE_SCRIPT_TRANSACTION = 'script-transations';
export const APP_ROUTE_SCRIPT_TRANSACTION_PATH = '/script-transations';
//end

//Redux
export const REDUX_AUTH_LOGIN = 'LOGIN';
export const REDUX_AUTH_LOGOUT = 'LOGOUT';
//end

//Session
export const SESSION_USER = 'investment-app-user';
export const SESSION_TOKENS = 'investment-app-toknes';
//end

//Transaction type
export const TRANSACTION_TYPE = { BUY: 'Buy', SELL: 'Sell' };
//end

//API
export const API_VERSION_V1 = 'v1';
export const API_VERSION = API_VERSION_V1;
export const API_DEV_URL = 'https://localhost:44313/'
export const API_BASE_URL = `${API_DEV_URL}api/${API_VERSION}/`;
export const API_CONTENT_TYPE = 'application/json'


//user
export const API_USER = 'user'
export const API_USER_GET_USER = `${API_USER}/get-users`;
export const API_USER_ADD_USER = `${API_USER}/add-user`;
export const API_USER_UPDATE_USER = `${API_USER}/update-user`;
export const API_USER_DELETE_USER = `${API_USER}/delete-user`;

export const API_USER_LOGIN = `${API_USER}/login`;
export const API_USER_RESET_PASSWORD = `${API_USER}/reset-password`;
export const API_USER_FORGOT_PASSWORD = `${API_USER}/forgot-password`;
//end


//bank-account
export const API_BANK_ACCOUNT = 'bank-account'
export const API_BANK_ACCOUNT_GET_BANK_ACCOUNTS = `${API_BANK_ACCOUNT}/get-bank-accounts`
export const API_BANK_ACCOUNT_ADD_BANK_ACCOUNT = `${API_BANK_ACCOUNT}/add-bank-account`
export const API_BANK_ACCOUNT_UPDATE_BANK_ACCOUNT = `${API_BANK_ACCOUNT}/update-bank-account`
export const API_BANK_ACCOUNT_DELETE_BANK_ACCOUNT = `${API_BANK_ACCOUNT}/delete-bank-account`
//end

//demat-account
export const API_DEMAT_ACCOUNT = 'demat-account'
export const API_DEMAT_ACCOUNT_GET_BROKERS = `${API_DEMAT_ACCOUNT}/get-brokers`
export const API_DEMAT_ACCOUNT_GET_BROKERS_BY_DEPOSITORY_PARTICIPANT_ID = `${API_DEMAT_ACCOUNT}/get-brokers-by-depository-participant-id`
export const API_DEMAT_ACCOUNT_ADD_BROKER = `${API_DEMAT_ACCOUNT}/add-broker`
export const API_DEMAT_ACCOUNT_UPDATE_BROKER = `${API_DEMAT_ACCOUNT}/update-broker`
export const API_DEMAT_ACCOUNT_DELETE_BROKER = `${API_DEMAT_ACCOUNT}/delete-brokers`

export const API_DEMAT_ACCOUNT_GET_DEPOSITORY_PARTICIPANTS = `${API_DEMAT_ACCOUNT}/get-depository-participants`
export const API_DEMAT_ACCOUNT_ADD_DEPOSITORY_PARTICIPANT = `${API_DEMAT_ACCOUNT}/add-depository-participant`
export const API_DEMAT_ACCOUNT_UPDATE_DEPOSITORY_PARTICIPANT = `${API_DEMAT_ACCOUNT}/update-depository-participant`
export const API_DEMAT_ACCOUNT_DELETE_DEPOSITORY_PARTICIPANT = `${API_DEMAT_ACCOUNT}/delete-depository-participant`

export const API_DEMAT_ACCOUNT_GET_DEMAT_ACCOUNTS = `${API_DEMAT_ACCOUNT}/get-demat-accounts`
export const API_DEMAT_ACCOUNT_ADD_DEMAT_ACCOUNT = `${API_DEMAT_ACCOUNT}/add-demat-account`
export const API_DEMAT_ACCOUNT_UPDATE_DEMAT_ACCOUNT = `${API_DEMAT_ACCOUNT}/update-demat-account`
export const API_DEMAT_ACCOUNT_DELETE_DEMAT_ACCOUNT = `${API_DEMAT_ACCOUNT}/delete-demat-account`
//end


//script
export const API_SCRIPT = 'script'

//script
export const API_SCRIPT_GET_SCRIPTS = `${API_SCRIPT}/get-scripts`
export const API_SCRIPT_ADD_SCRIPT = `${API_SCRIPT}/add-script`
export const API_SCRIPT_UPDATE_SCRIPT = `${API_SCRIPT}/update-script`

//user script
export const API_SCRIPT_GET_USER_SCRIPTS = `${API_SCRIPT}/get-user-scripts`
export const API_SCRIPT_ADD_USER_SCRIPT = `${API_SCRIPT}/add-user-script`
export const API_SCRIPT_UPDATE_USER_SCRIPT = `${API_SCRIPT}/update-user-script`

//script transaction
export const API_SCRIPT_GET_TRANSACTIONS = `${API_SCRIPT}/get-transactions`
export const API_SCRIPT_ADD_TRANSACTION = `${API_SCRIPT}/add-transactions`
export const API_SCRIPT_UPDATE_TRANSACTION = `${API_SCRIPT}/update-transactions`

//end

//end API







export const APP_PUBLIC_URL = `${process.env.PUBLIC_URL}/`;
export const APP_ENVIRONMENT = `${process.env.NODE_ENV}`;

export const APP_IMG_PUBLIC_URL = `${APP_PUBLIC_URL}/img/`