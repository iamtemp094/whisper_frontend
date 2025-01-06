import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_id:null,
    user_name:null,
    token:null,
    isLoggedIn:false
}
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthData:(state,action)=>{
            state.user_id = action.payload.user_id
            state.user_name = action.payload.user_name
            state.token = action.payload.token
            state.isLoggedIn = action.payload.isLoggedIn
        },
        removeAuthData:(state,action)=>{
            state.user_id = null
            state.user_name = null
            state.token = null
            state.isLoggedIn = false
        }
    }
})
export const {setAuthData,removeAuthData} = authSlice.actions
export default authSlice.reducer