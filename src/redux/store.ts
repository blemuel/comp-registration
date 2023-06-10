import { configureStore } from '@reduxjs/toolkit'
import addressSlice from './feature/addressSlice'
import authReducer from './feature/formSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressSlice,
  },
})
export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
