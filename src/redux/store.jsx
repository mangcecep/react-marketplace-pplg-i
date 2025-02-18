import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import { productReducer } from "./productSlice"
import { userReducer } from "./userSlice";
import { bannerReducer } from "./bannerSlice";
import productTypeReducer from "./productTypeSlice";

export const store = configureStore({
    reducer: combineReducers({
        productType: productTypeReducer,
        banner: bannerReducer,
        cart: cartReducer,
        product: productReducer,
        user: userReducer
    })
})
