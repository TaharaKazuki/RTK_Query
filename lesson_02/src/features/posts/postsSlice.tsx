import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type PostState = {
  id: string
  title: string
  content: string
}

const initialState: PostState[] = [
  { id: '1', title: 'Redux toolkit', content: 'good things' },
  { id: '2', title: 'Slices', content: 'pizza' },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<PostState>) => {
      state.push(action.payload)
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
