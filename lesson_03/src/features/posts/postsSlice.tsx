import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
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

const fetchStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const

type initialStateType = {
  posts: PostState[]
  status: typeof fetchStatus[keyof typeof fetchStatus]
  error: Error | null
}

const initialState: initialStateType = {
  posts: [],
  status: 'idle',
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostState>) => {
        state.posts.push(action.payload)
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
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const selectAllPosts = (state: RootState) => state.posts.posts

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
