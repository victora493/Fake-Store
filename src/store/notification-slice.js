import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// type:
//     'success' ||
//     'error' ||
//     'promise' ||
//     'loading' ||
// ,
// message: '',
// promise: promise,
// promiseText: {
//      loading: '',
//      success: '',
//      error: '',
// }

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        showNotification(state, { payload }) {
            if(!payload) return console.log('you need to provide a proper payload to show a notification')

            state = payload

            switch(payload.type) {
                case 'success':
                    toast.success(payload?.message || 'success')
                    break
                case 'error':
                    toast.success(payload?.message || 'error')
                    break
                case 'promise':
                    toast.promise(payload?.promise, {
                        loading: payload?.promiseText?.loading || 'Loading',
                        success: payload?.promiseText?.success || 'Got the data',
                        error: (err) => `An error ocurred. ${err?.message?.toString() || err.toString()}` || 'Error when fetching',
                    })
                    break
            }
        }
    }
})

export const notificationActions = notificationSlice.actions

export default notificationSlice