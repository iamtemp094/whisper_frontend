import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import socketReducer from './slices/socket/socketSlice' 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
  },
})