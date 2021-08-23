import { createSlice } from '@reduxjs/toolkit'

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
        replaceCart(state, {payload}) {
            state.products = payload?.products || []
            state.totalProducts = payload?.totalProducts || 0
            state.totalPrice = payload?.totalPrice || 0
        },
        actuallyAddProduct(state, {payload}) {
            const productObj = { ...payload.product }
            const qtyToAdd = +payload?.qty || null

            const existingProduct = state.products.find(item => item.id === productObj.id)

            if(existingProduct) {
                // check if payload has a qty to add or add only 1 instead
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
        },
        removeProduct(state, {payload}) {
            console.log(payload)
            const productId = payload

            const existingProduct = state.products.find(item => item.id === productId)

            if(!existingProduct) return state

            state.products = state.products.filter(product => product.id !== productId)
            updateAdditionalValues(state)
        }
    },
})

let isFirstCall = true
export const handleCartReplace = (payload) => async (dispatch, getState) => {
    console.log(payload)
    const { cart } = getState()

    if(isFirstCall) {
        const loadedCartState = await payload.loadState('cart')
        dispatch(cartSlice.actions.replaceCart(loadedCartState))
        isFirstCall = false
        return
    }
    
    payload.saveState(cart, 'cart')
}

export const cartActions = cartSlice.actions

export default cartSlice