import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import shoppingCartProductsReducer from "./reducers/shoppingCartProductsReducer";

export default configureStore({
    reducer: {
        products: productsReducer,
        shoppingCardProducts: shoppingCartProductsReducer
    }
})