import { fectchAPI } from "../utils";

const productInit = {
    load: true,
    data: [],
    error: null,
    message: ''
}

const getProduct = () => {
    return (dispatch) => {
        dispatch({
            type: "PRODUCT_INIT"
        })
        fectchAPI().get('/product')
            .then((response) => {
                dispatch({
                    type: "PRODUCT_FETCH_SUCCESS",
                    payload: {
                        data: response?.data?.data,
                        message: response?.data?.message
                    }
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'PRODUCT_FETCH_FAIL',
                    payload: {
                        error: error.response
                    }
                })
            })
    }
}

const addToCart = (product, id) => {
    let productChoose = product?.map((p) => p.id === id ? { ...p, stock: p.stock - 1 } : p)

    return {
        type: "PRODUCT_TO_CART",
        payload: {
            data: productChoose
        }
    }
}

const productReducer = (state = productInit, action) => {
    switch (action.type) {
        case "PRODUCT_INIT":
            return { ...state }
        case "PRODUCT_TO_CART":
            return {
                ...state,
                data: action?.payload?.data
            }
        case "PRODUCT_FETCH_SUCCESS":
            return {
                ...state,
                load: false,
                data: action?.payload?.data,
                message: action?.payload?.message
            }
        case "PRODUCT_FETCH_FAIL":
            return {
                ...state,
                error: action?.payload?.error
            }
        default:
            return productInit
    }
}

export {
    productReducer,
    getProduct,
    addToCart
}