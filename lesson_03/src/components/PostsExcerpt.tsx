import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { PostState } from '../features/posts/postsSlice'
import { FC } from 'react'

type Props = {
  post: PostState
}

const PostsExcerpt: FC<Props> = ({ post }) => {
  return (
    <>
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>

        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timeStamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    </>
  )
}

export default PostsExcerpt
