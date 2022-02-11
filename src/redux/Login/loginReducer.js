import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, SET_USER } from "./loginType";

const initialState = {
    loading: false,
    currentUser: null,
    error: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload
            }
        case SET_USER: 
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default loginReducer
