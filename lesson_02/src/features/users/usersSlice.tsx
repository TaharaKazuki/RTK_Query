import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type UserState = {
  id: string
  name: string
}

const initialState: UserState[] = [
  { id: '0', name: 'SampleName' },
  { id: '1', name: 'SampleName2' },
  { id: '2', name: 'SampleName3' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const selectAllUsers = (state: RootState) => state.users

export default userSlice.reducer
