import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
  fetchStatus,
} from '../features/posts/postsSlice'
import PostsExcerpt from './PostsExcerpt'

const PostList = () => {
  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectAllPosts)
  const postsStatus = useAppSelector(getPostsStatus)
  const error = useAppSelector(getPostsError)

  useEffect(() => {
    if (postsStatus === fetchStatus.IDLE) {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content: ReactNode | null

  if (postsStatus === fetchStatus.LOADING) {
    content = <p>Loading...</p>
  } else if (postsStatus === fetchStatus.SUCCEEDED) {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
  } else if (postsStatus === fetchStatus.FAILED) {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Posts</h2>
      <>{content}</>
    </section>
  )
}

export default PostList
