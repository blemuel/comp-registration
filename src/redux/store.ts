import { configureStore } from '@reduxjs/toolkit'
import { reducer as reduxFormReducer } from 'redux-form'

export const store = configureStore({
  reducer: {
    form: reduxFormReducer,
  },
})
