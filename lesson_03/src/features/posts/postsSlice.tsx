import { createSlice, nanoid, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { sub } from 'date-fns'
import axios from 'axios'

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

type ReactionPayload = {
  postId: string
  reaction: keyof typeof initialReactions
}

type initialStateType = {
  posts: PostState[]
  status: typeof fetchStatus[keyof typeof fetchStatus]
  error: string | undefined
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/pots'

const initialReactions = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0,
}

const fetchStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const

const initialState: initialStateType = {
  posts: [],
  status: 'idle',
  error: undefined,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL)
    return [...response.data]
  } catch (err: any) {
    return err.message
  }
})

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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostState[]>) => {
        state.status = 'succeeded'
        let min = 1
        const loadedPots = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            ...initialReactions,
          }
          return post
        })
        state.posts = state.posts.concat(loadedPots)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectAllPosts = (state: RootState) => state.posts.posts

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
