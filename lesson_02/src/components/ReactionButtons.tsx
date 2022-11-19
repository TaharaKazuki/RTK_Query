import { FC } from 'react'
import { useAppDispatch } from '../app/hooks'
import { reactionAdded, PostState as PostType } from '../features/posts/postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
}

type Props = {
  post: PostType
}

const ReactionButtons: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name as keyof typeof reactionEmoji }))
        }
      >
        {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

export default ReactionButtons
