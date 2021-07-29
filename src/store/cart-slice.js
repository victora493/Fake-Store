import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    totalProducts: 0,
    totalPrice: 0,
}

const reduceByKey = (key) => (acc, product) => acc + product[key]
const reduceTotalPrice = (acc, product) => acc + (product.quantity * product.price)

const updateAdditionalValues = (state) => {
    state.totalProducts = state.products.reduce(reduceByKey('quantity'), 0)
    state.totalPrice = state.products.reduce(reduceTotalPrice, 0)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, {payload}) {
            const productObj = { ...payload.product }
            const qtyToAdd = payload?.qty || null

            const existingProduct = state.products.find(item => item.id === productObj.id)

            if(existingProduct) {
                // check if payload has a qty to add or add only 1
                qtyToAdd ? existingProduct.quantity = qtyToAdd : existingProduct.quantity++
            } else {
                // add single product obj to cart
                state.products.push({ ...productObj, quantity: 1 })
            }

            updateAdditionalValues(state)
        },
        decreaseProduct(state, {payload}) {
            const productId = payload

            const existingProduct = state.products.find(item => item.id === productId)

            if(!existingProduct) return state

            if(existingProduct.quantity === 1) {
                state.products = state.products.filter(product => product.id !== productId)
            } else {
                existingProduct.quantity--
            }

            updateAdditionalValues(state)
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice