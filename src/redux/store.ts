import { configureStore } from '@reduxjs/toolkit'
import addressSlice from './feature/addressSlice'
import formSlice from './feature/formSlice'

const store = configureStore({
  reducer: {
    form: formSlice,
    address: addressSlice,
  },
})
export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
