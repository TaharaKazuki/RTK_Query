import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { RootState } from '../../app/store'

export type PostState = {
  id: string
  title: string
  content: string
  userId: string
  date: string
  reactions: Reaction
}

type Reaction = {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

const initialReactions = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0,
}

type ReactionPayload = {
  postId: string
  reaction: keyof typeof initialReactions
}

const initialState: PostState[] = [
  {
    id: nanoid(),
    title: 'Redux toolkit',
    content: 'good things',
    userId: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { ...initialReactions },
  },
  {
    id: nanoid(),
    title: 'Slices',
    content: 'pizza',
    userId: '0',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { ...initialReactions },
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
            reactions: { ...initialReactions },
          },
        }
      },
    },
    reactionAdded: (state, action: PayloadAction<ReactionPayload>) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
