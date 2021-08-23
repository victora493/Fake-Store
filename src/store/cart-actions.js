import { cartActions } from './cart-slice'
import { notificationActions } from './notification-slice'
import { loadState, saveState } from '../hooks/use-local-storage'

export const addProduct = (payload) => (dispatch, getState) => {
    const { cart } = getState()
        
    const existingProduct = cart.products.find(item => item.id === payload.product.id)
    
    if(payload?.qty > 0 && payload?.qty <= 10) return dispatch(cartActions.actuallyAddProduct(payload))

    if(existingProduct?.quantity === 10) {
        // should dispatch a notification saying the max number of items is 10
        dispatch(notificationActions.showNotification({
            type: 'error',
            message: 'Sorry, you can add only a max of 10 items per product'
        }))
        return
    }
    dispatch(cartActions.actuallyAddProduct(payload))
}

// action to get latest cart data in the local storage(needed when page first load)
export const getCartData = () => {
    return async dispatch => {
        try {
            const data = await loadState('cart')

            // dispatch the data payload to a reducer
            dispatch(cartActions.replaceCart(data))
        } catch (err) {
            console.log('😢 error:',err)
            dispatch(notificationActions.showNotification({
                type: 'error',
                message: 'Fetching cart data failed!'
            }))
        }
    }
}

export const storeCartData = (cart) => {
    return async dispatch => {
        try {
            await saveState(cart, 'cart')

            dispatch(notificationActions.showNotification({
                type: 'success',
                message: 'Cart updated correctly!'
            }))
        } catch (err) {
            console.log('😢 error:',err)
            dispatch(notificationActions.showNotification({
                type: 'error',
                message: 'Storing cart data failed!'
            }))
        }
    }
}

