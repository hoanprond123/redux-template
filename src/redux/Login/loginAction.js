import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, SET_USER, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./loginType";
import {auth, fs} from '../../firebase'

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

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}


export const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST
    }
}

export const signupSuccess = (user) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: user
    }
}

export const signupFailure = (error) => {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    }
}

export const signup1 = (email, password) => {
    return (dispatch) => {
        dispatch(signupRequest())
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(signupSuccess(user));
                return fs.collection('users').doc(user.uid).set({
                    Email: user.email
                })
            })
            .catch((error) => dispatch(signupFailure(error.message)))
    }
}

