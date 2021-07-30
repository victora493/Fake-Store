import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart-slice';
import notificationSlice from './notification-slice';

const store = configureStore({
    reducer: { 
        cart: cartSlice.reducer, 
        notification: notificationSlice.reducer, 
    },
});

export default store;
