import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type PostState = {
  id: string
  title: string
  content: string
  userId?: string
}

const initialState: PostState[] = [
  { id: nanoid(), title: 'Redux toolkit', content: 'good things' },
  { id: nanoid(), title: 'Slices', content: 'pizza' },
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostState>) => {
        state.push(action.payload)
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        }
      },
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
