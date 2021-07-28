import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    totalProducts: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, {payload}) {
            const productObj = { ...payload.product }
            const qtyToAdd = payload?.qty

            const existingProduct = state.products.find(item => item.id === productObj.id)

            if(existingProduct) {
                // check if payload has a qty to add or add only 1
            } else {
                // add single product obj to cart
            }
        },
        decreaseProduct(state, {payload}) {

        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice