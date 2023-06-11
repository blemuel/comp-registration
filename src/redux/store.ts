import { configureStore } from '@reduxjs/toolkit'
import { formApi } from '../services/form/formService'
import addressSlice from './feature/addressSlice'
import formSlice from './feature/formSlice'

const store = configureStore({
  reducer: {
    form: formSlice,
    address: addressSlice,
    [formApi.reducerPath]: formApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['form/submitForm'],
        ignoredActionPaths: ['meta.arg.file', 'payload.file'],
        ignoredPaths: ['form.formData.file', 'payload.file'],
      },
    }).concat(formApi.middleware),
})
export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
