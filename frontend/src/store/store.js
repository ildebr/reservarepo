import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/CounterSlice'
import authSlice from '../features/AuthSlice'
import alertSlice  from '../features/AlertSlice'
import userSlice  from '../features/UserSlice'
import ReservaSlice from '../features/ReservaSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    alert: alertSlice,
    user: userSlice,
    reserva: ReservaSlice,
  },
})

