import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

type UserState = {
  id: string
  name: string
  username: string
  email: string
}

const initialState: UserState[] = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL)
    return [...response.data]
  } catch (error: any) {
    return error.message
  }
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectAllUsers = (state: RootState) => state.users

export default userSlice.reducer
