import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FormData } from '../../types/types'

import axios from 'axios'
import CryptoJS from 'crypto-js'

const initialState = {
  loading: false,
  error: '',
  success: false,
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    companyName: '',
    corporationDate: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    },
    file: {} as FileList,
  } as Partial<FormData>,
}

const backendURL = 'http://localhost:5000'

export const submitFormAction = createAsyncThunk(
  'form/submitForm',
  async (formDate: FormData, { rejectWithValue }) => {
    try {
      const secretInfo = CryptoJS.AES.encrypt(
        JSON.stringify(formDate),
        process.env.REACT_APP_MY_SUPER_SAFE_SECRET as string
      )

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // Simulates sending data to backend
      try {
        await axios.post(
          `${backendURL}/api/form/send-form`,
          { secretInfo },
          config
        )
      } catch {
        // NOTE: As the backend is not implemented, this will always fail
      }

      return formDate
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(submitFormAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(submitFormAction.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.formData = action.payload
    })
    builder.addCase(submitFormAction.rejected, (state) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
  },
})

export const { resetForm } = formSlice.actions

export default formSlice.reducer
