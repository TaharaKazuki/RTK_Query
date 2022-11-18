import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { RootState } from '../../app/store'

type PostState = {
  id: string
  title: string
  content: string
  userId: string
  date: string
}

const initialState: PostState[] = [
  {
    id: nanoid(),
    title: 'Redux toolkit',
    content: 'good things',
    userId: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: nanoid(),
    title: 'Slices',
    content: 'pizza',
    userId: '0',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
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
            date: new Date().toISOString(),
          },
        }
      },
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
