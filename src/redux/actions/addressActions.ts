import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fake envs to don't need to create a .env file
const backendURL = 'http://api.positionstack.com/v1'
const fakeEnv = 'bec3722a30e9f115b601670a826b178e'

export const getAddress = createAsyncThunk(
  'address/getAddress',
  async ({ query }, { rejectWithValue }) => {
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
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
