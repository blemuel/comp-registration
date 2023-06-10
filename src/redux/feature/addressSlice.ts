import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  error: null,
  success: false,
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
}

// Fake envs to don't need to create a .env file
const backendURL = 'http://api.positionstack.com/v1'
const fakeEnv = 'bec3722a30e9f115b601670a826b178e'

export const getAddress = createAsyncThunk(
  'address/getAddress',
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/forward?access_key=${fakeEnv}&query=${query}`,
        config
      )
      return data
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddress.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      // state.address = [action.payload]
    })
    builder.addCase(getAddress.rejected, (state) => {
      state.loading = false
    })
  },
})

export default addressSlice.reducer
