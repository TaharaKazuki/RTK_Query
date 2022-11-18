import { FC } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectAllUsers } from '../features/users/usersSlice'

type Props = {
  userId: string
}

const PostAuthor: FC<Props> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers)

  const author = users.find((user) => user.id === userId)

  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
