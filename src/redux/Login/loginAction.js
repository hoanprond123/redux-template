import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from "./loginType";
import {auth} from '../../firebase'
export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const login1 = (email, password) => {
    return (dispatch) => {
        dispatch(loginRequest())
        auth
            .signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(loginSuccess(user));
            })
            .catch((error) => dispatch(loginFailure(error.message)))
    }
}

export const logoutRequest = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFailure = (error) => {
    return {
        type: LOGOUT_FAILURE,
        payload: error
    }
}

export const logout1 = () => {
    return (dispatch) => {
        dispatch(logoutRequest())
        auth
            .signOut()
            .then(res => {
                dispatch(logoutSuccess());
            })
            .catch((error) => dispatch(logoutFailure(error.message)))
    }
}