import { createSlice } from '@reduxjs/toolkit'
import { notificationActions } from './notification-slice'

const initialState = {
    products: [],
    totalProducts: 0,
    totalPrice: 0,
}

const byKeyReducer = (key) => (acc, product) => acc + product[key]
const totalPriceReducer = (acc, product) => acc + (product.quantity * product.price)

const updateAdditionalValues = (state) => {
    state.totalProducts = state.products.reduce(byKeyReducer('quantity'), 0)
    state.totalPrice = state.products.reduce(totalPriceReducer, 0)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        actuallyAddProduct(state, {payload}) {
            const productObj = { ...payload.product }
            const qtyToAdd = +payload?.qty || null

            const existingProduct = state.products.find(item => item.id === productObj.id)

            if(existingProduct) {
                // check if payload has a qty to add or add only 1
                qtyToAdd ? existingProduct.quantity = +qtyToAdd : existingProduct.quantity++
            } else {
                // add single product obj to cart
                state.products.push({ ...productObj, quantity: qtyToAdd ? qtyToAdd : 1 })
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
    },
})

export const addProduct = (payload) => (dispatch, getState) => {
    const { cart } = getState()
        
    const existingProduct = cart.products.find(item => item.id === payload.product.id)
    
    console.log(cart)
    console.log(payload)
    console.log(existingProduct)
    if(existingProduct?.quantity === 10) {
        // should dispatch a notification saying the max number of items is 10
        dispatch(notificationActions.showNotification({
            type: 'error',
            message: 'Sorry, you can add only a max of 10 items per product'
        }))
        return
    }
    dispatch(cartSlice.actions.actuallyAddProduct(payload))
}

export const cartActions = cartSlice.actions

export default cartSlice