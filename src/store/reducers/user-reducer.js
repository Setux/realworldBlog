import { LOGIN_USER, LOGOUT_USER, LOGIN_ERROR, REG_ERROR, CLOSE_ERROR, UPDATE_ERROR } from './constants'

const initialState = {
  user: null,
  isLoggedIn: false,
  loginError: false,
  updateError: false,
  regError: false
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return {
        user: payload,
        isLoggedIn: true,
        loginError: false,
      };
    case LOGOUT_USER:
      return {
        user: null,
        isLoggedIn: false,
        loginError: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        updateError: true
      }
    case CLOSE_ERROR:
      return {
        ...state,
        loginError: false,
        updateError: false,
        regError: false,
        user: null
      };
    case REG_ERROR:
      return {
        ...state,
        regError: true,
        user: payload
      }
    default:
      return state;
  }
}
