import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from '../features/posts/postsSlice'

type FormData = {
  title: string
  content: string
}

const initialPostData = {
  title: '',
  content: '',
}

const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const [{ title, content }, setFormData] = useState<FormData>({
    ...initialPostData,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target
    setFormData((state) => ({ ...state, [name]: event.target.value }))
  }

  const onSavePostClicked = (event: SyntheticEvent) => {
    event.preventDefault()
    if (title && content) {
      dispatch(postAdded(title, content))
      setFormData({ ...initialPostData })
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="title">Post Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleChange} />
        <label htmlFor="content">Post Content:</label>
        <textarea name="content" id="content" value={content} onChange={handleChange}></textarea>
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
