import { fectchAPI } from "../utils"

const init = {
    load: true,
    data: null,
    message: "",
    err: null
}

export const getProfile = () => (dispatch) => fectchAPI()
    .get("user")
    .then(response => dispatch({
        type: "AUTH_SUCCESS",
        payload: {
            data: response?.data
        }
    }))
    .catch(err => dispatch({
        type: "AUTH_FAIL",
        payload: {
            error: err?.response
        }
    }))

export const loginSubmit = (data) => (dispatch) => fectchAPI().post("auth", data)
    .then(response => {
        let token = response?.data?.access_token;
        localStorage.setItem("token", token)
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
                message: response.data.message
            }
        })
        window.location.href = '/dashboard'
    })
    .catch(err => dispatch({
        type: 'LOGIN_FAIL',
        payload: {
            error: err.response.data
        }
    }))

export const registerSubmit = (data) => (dispatch) => fectchAPI().post("register", data).then(response =>
    dispatch({
        type: 'REGISTER_SUCCESS',
        payload: {
            message: response.data.message
        }
    }))
    .catch(err => dispatch({
        type: 'REGISTER_FAIL',
        payload: {
            error: err.response.data
        }
    }))

const userReducer = (state = init, action) => {
    switch (action?.type) {
        case "AUTH_INIT":
            return init
        case "AUTH_SUCCESS":
            return {
                ...state,
                load: false,
                data: action?.payload?.data
            }
        case "AUTH_FAIL":
            return {
                ...state,
                load: false,
                data: null,
                err: action?.payload?.error
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                err: action?.payload?.error
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                message: action?.payload?.message
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                err: action?.payload?.error
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                message: action?.payload?.message
            }
        default:
            return init
    }
}

export {
    userReducer
}