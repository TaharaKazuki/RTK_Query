import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectAllUsers } from '../features/users/usersSlice'

import { fetchStatusType, fetchStatus, postAdded, addNewPost } from '../features/posts/postsSlice'

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
  const [addRequestStatus, setAddRequestStatus] = useState<fetchStatusType>(fetchStatus.IDLE)

  const users = useAppSelector(selectAllUsers)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = event.target
    setFormData((state) => ({ ...state, [name]: event.target.value }))
  }

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === fetchStatus.IDLE

  const onSavePostClicked = (event: SyntheticEvent) => {
    event.preventDefault()
    if (canSave) {
      try {
        setAddRequestStatus(fetchStatus.LOADING)
        dispatch(addNewPost({ title, body: content, userId })).unwrap()
      } catch (err) {
        console.info('Failed to save the post', err)
      } finally {
        setAddRequestStatus(fetchStatus.IDLE)
      }
    }
  }

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
