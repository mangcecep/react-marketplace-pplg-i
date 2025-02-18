import { fectchAPI } from "../utils";

const init = {
    load: true,
    data: [],
    error: null,
    message: ''
}

const getBanner = () => {
    return (dispatch) => {
        dispatch({
            type: "BANNER_INIT"
        })
        fectchAPI().get('/banner')
            .then((response) => {
                dispatch({
                    type: "BANNER_FETCH_SUCCESS",
                    payload: {
                        data: response?.data?.data,
                        message: response?.data?.message
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'BANNER_FETCH_FAIL',
                    payload: {
                        error: error.response
                    }
                })
            })
    }
}

const bannerReducer = (state = init, action) => {
    switch (action.type) {
        case "BANNER_INIT":
            return { ...state }
        case "BANNER_TO_CART":
            return {
                ...state,
                data: action?.payload?.data
            }
        case "BANNER_FETCH_SUCCESS":
            return {
                ...state,
                load: false,
                data: action?.payload?.data,
                message: action?.payload?.message
            }
        case "BANNER_FETCH_FAIL":
            return {
                ...state,
                load: false,
                error: action?.payload?.error
            }
        default:
            return init
    }
}

export {
    bannerReducer,
    getBanner,
}