import { fectchAPI } from "../utils"

const productTypeInit = {
    load: true,
    data: [],
    error: null,
    message: ''
}

export const storeProductType = (data) => async (dispatch) =>
    await fectchAPI()
        .post("/product-types", data)
        .then(response => {
            dispatch({
                type: "PRODUCT_TYPE_STORE_SUCCESS",
                payload: {
                    mesesage: response?.data?.message
                }
            })
            dispatch(fetchProductType())
        })
        .catch(err => dispatch({
            type: "PRODUCT_TYPE_STORE_FAIL",
            payload: {
                error: err?.response
            }
        }))

export const fetchProductType = () => async (dispatch) => {
    await dispatch({
        type: "PRODUCT_TYPE_INIT"
    })
    await fectchAPI()
        .get("/product-types")
        .then(response => dispatch({
            type: "PRODUCT_TYPE_FETCH_SUCCESS",
            payload: {
                data: response?.data?.data
            }
        }))
        .catch(err => dispatch({
            type: "PRODUCT_TYPE_FETCH_FAIL",
            payload: {
                error: err?.response
            }
        }))
}

const productTypeReducer = (state = productTypeInit, action) => {
    switch (action.type) {
        case "PRODUCT_TYPE_INIT":
            return { ...state }
        case "PRODUCT_TYPE_FETCH_SUCCESS":
            return {
                ...state,
                load: false,
                data: action?.payload?.data
            }
        case "PRODUCT_TYPE_STORE_SUCCESS":
            return {
                ...state,
                load: false,
                message: action?.payload?.message,
                error: null
            }
        case "PRODUCT_TYPE_STORE_FAIL":
            return {
                ...state,
                error: action?.payload?.error
            }
        case "PRODUCT_TYPE_FETCH_FAIL":
            return {
                ...state,
                error: action?.payload?.error
            }
        default:
            return productTypeInit
    }
}

export default productTypeReducer