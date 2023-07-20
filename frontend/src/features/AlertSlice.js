import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alert: null
};


export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        generateAlert: (state,action) =>{
            state.alert = action.payload
        },
        removeAlert: (state) =>{
            state.alert = null
        }
    }
})



export const { generateAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer