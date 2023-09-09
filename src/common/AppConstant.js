export const CURRENT_YEAR = new Date().getFullYear();
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const SWAL_TYPE_ERROR = 'error';
export const SWAL_TYPE_SUCCESS = 'success'; 
export const SWAL_TITLE_ERROR = 'Oops!';
export const SWAL_TITLE_SUCCESS = 'Successful';

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

export const REDUX_AUTH_LOGIN = 'LOGIN';
export const REDUX_AUTH_LOGOUT = 'LOGOUT';

export const SESSION_USER = 'investment-app-user';
export const SESSION_TOKENS = 'investment-app-toknes';


export const API_VERSION_V1 = 'v1';
export const API_VERSION = API_VERSION_V1;
export const API_DEV_URL = 'https://localhost:44313/'
export const API_BASE_URL = `${API_DEV_URL}api/${API_VERSION}/`;
export const API_CONTENT_TYPE = 'application/json'

export const API_USER = 'user'
export const API_USER_GET_USER = `${API_USER}/get-users`;
export const API_USER_ADD_USER = `${API_USER}/add-user`;
export const API_USER_UPDATE_USER = `${API_USER}/update-user`;
export const API_USER_DELETE_USER = `${API_USER}/delete-user`;

export const API_USER_LOGIN = `${API_USER}/login`;
export const API_USER_RESET_PASSWORD = `${API_USER}/reset-password`;
export const API_USER_FORGOT_PASSWORD = `${API_USER}/forgot-password`;

export const API_BANK_ACCOUNT = 'bank-account'
export const API_BANK_ACCOUNT_GET_BANK_ACCOUNTS=`${API_BANK_ACCOUNT}/get-bank-accounts`
export const API_BANK_ACCOUNT_ADD_BANK_ACCOUNT=`${API_BANK_ACCOUNT}/add-bank-account`
export const API_BANK_ACCOUNT_UPDATE_BANK_ACCOUNT=`${API_BANK_ACCOUNT}/update-bank-account`
export const API_BANK_ACCOUNT_DELETE_BANK_ACCOUNT=`${API_BANK_ACCOUNT}/delete-bank-account`




export const APP_PUBLIC_URL = `${process.env.PUBLIC_URL}/`;
export const APP_ENVIRONMENT = `${process.env.NODE_ENV}`;

export const APP_IMG_PUBLIC_URL = `${APP_PUBLIC_URL}/img/`