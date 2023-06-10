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
const backendURL = 'https://maps.googleapis.com/maps/api'
const fakeEnv = 'AIzaSyDdyKdaPjssTn88nUwMfmsnxsIeiTySRy8'

export const getAddress = createAsyncThunk(
  'address/getAddress',
  async ({ query }: { query: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.get(
        `${backendURL}/geocode/json?address=${query}&key=${fakeEnv}`,
        config
      )
      if (data.status !== 'OK') return rejectWithValue('No data found')
      const { results } = data
      const formattedAddress = {
        street: results[0].address_components[0].long_name,
        city: results[0].address_components[1].long_name,
        state: results[0].address_components[2].short_name,
        country: results[0].address_components[3].short_name,
        zip: results[0].address_components[4].long_name,
      }
      return formattedAddress
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
      state.address = action.payload
    })
    builder.addCase(getAddress.rejected, (state) => {
      state.loading = false
    })
  },
})

export default addressSlice.reducer
