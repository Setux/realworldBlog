import { LOGIN_USER, LOGOUT_USER, USER_ERROR, CLOSE_ERROR, CONFIRM_RULES } from '../../assets/constants/constants';

const initialState = {
  user: null,
  errorsList: null,
  isLoggedIn: false,
  isError: false,
  confirmedRules: false
};

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
        errorsList: null,
      };
    case CONFIRM_RULES:
      return {
        ...state,
        confirmedRules: !state.confirmedRules
      }
    case LOGOUT_USER:
      return {
        user: null,
        isLoggedIn: false,
        loginError: false,
      };
    case USER_ERROR:
      return {
        ...state,
        isError: true,
        errorsList: payload,
      };
    case CLOSE_ERROR:
      return {
        ...state,
        errorsList: null,
        isError: false
      };
    default:
      return state;
  }
}
