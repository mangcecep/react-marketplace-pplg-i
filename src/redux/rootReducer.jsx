import { combineReducers } from "redux";
import productTypeReducer from "./productTypeSlice";
import { bannerReducer } from "./bannerSlice";
import cartReducer from "./cartSlice"
import { productReducer } from "./productSlice"
import { userReducer } from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const root = combineReducers({
    productType: productTypeReducer,
    banner: bannerReducer,
    cart: cartReducer,
    product: productReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, root)
export default persistedReducer