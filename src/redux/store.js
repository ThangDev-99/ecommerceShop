import { configureStore } from "@reduxjs/toolkit"
import productModalSlide from "./product-modal/productModalSlide"
import cartItemsSlice from "./shopping-cart/cartItemSlide"

export const store = configureStore({
    reducer: {
        productModal: productModalSlide,
        cartItems: cartItemsSlice
    }
})