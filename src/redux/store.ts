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
