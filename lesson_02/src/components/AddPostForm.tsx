import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectAllUsers } from '../features/users/usersSlice'

import { postAdded } from '../features/posts/postsSlice'

type FormData = {
  title: string
  content: string
  userId: string
}

const initialPostData = {
  title: '',
  content: '',
  userId: '',
}

const AddPostForm = () => {
  const dispatch = useAppDispatch()

  const [{ title, content, userId }, setFormData] = useState<FormData>({
    ...initialPostData,
  })

  const users = useAppSelector(selectAllUsers)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = event.target
    console.info(event.target.value)
    setFormData((state) => ({ ...state, [name]: event.target.value }))
  }

  const onSavePostClicked = (event: SyntheticEvent) => {
    event.preventDefault()
    if (title && content) {
      dispatch(postAdded(title, content, userId))
      setFormData({ ...initialPostData, userId: userId })
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="title">Post Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleChange} />
        <label htmlFor="author">Author:</label>
        <select name="userId" id="userId" value={userId} onChange={handleChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="content">Post Content:</label>
        <textarea name="content" id="content" value={content} onChange={handleChange}></textarea>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
