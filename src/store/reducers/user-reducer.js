import {LOGIN_USER, LOGOUT_USER, LOGIN_ERROR, CLOSE_ERROR} from "./constants";

const initialState = {
    user: null,
    isLoggedIn: false,
    loginError: false,
}

export default function userReducer(state = initialState, {type, payload}) {
    switch(type) {
        case LOGIN_USER:
            return {
                user: payload,
                isLoggedIn: true,
                loginError: false
            }
        case LOGOUT_USER:
            return {
                user: null,
                isLoggedIn: false,
                loginError: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: true
            }
        case CLOSE_ERROR:
            return {
                ...state,
                loginError: false
            }
        default:
            return state
    }
}