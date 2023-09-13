import { REDUX_AUTH_LOGIN, REDUX_AUTH_LOGOUT, SESSION_TOKENS, SESSION_USER } from "../common/AppConstant";

const user = JSON.parse(localStorage.getItem(SESSION_USER));
const tokens = JSON.parse(localStorage.getItem(SESSION_TOKENS));

const initialState = user ? {
  isAuthenticated: true,
  user,
  tokens,
}
  : {
    isAuthenticated: false,
    user: null,
    tokens: null,
  };


const auth = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case REDUX_AUTH_LOGIN:
      {
        // localStorage.removeItem(SESSION_USER);
        // localStorage.removeItem(SESSION_TOKENS);
        // localStorage.setItem(SESSION_USER, JSON.stringify(payload));
        // localStorage.setItem(SESSION_TOKENS, JSON.stringify(payload.tokens));
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
          tokens: payload.tokens
        };
      }
    case REDUX_AUTH_LOGOUT:
      {
        // localStorage.removeItem(SESSION_USER);
        // localStorage.removeItem(SESSION_TOKENS);
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          tokens: null,
        };
      }
    default:
      return state;
  }

}

export default auth;