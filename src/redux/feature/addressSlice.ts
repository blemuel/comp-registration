import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  error: '',
  success: false,
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
}

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
        `${process.env.REACT_APP_MAPS_BASE_URL}/geocode/json?address=${query}&key=${process.env.REACT_APP_MAPS_API_KEY}`,
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
  reducers: {
    resetAddress: () => initialState,
  },
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
      state.error = 'Something went wrong'
    })
  },
})

export const { resetAddress } = addressSlice.actions

export default addressSlice.reducer
