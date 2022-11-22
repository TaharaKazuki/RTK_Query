import { useState, ChangeEvent } from 'react'
import { PageLayout, Input } from 'components/common'
import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;
`

type FormFieldsType = {
  username: string
  password: string
}

const Login = () => {
  const [{ username, password }, setFormFields] = useState<FormFieldsType>({
    username: '',
    password: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name } = e.target
    setFormFields((state) => ({ ...state, [name]: e.target.value }))
  }

  return (
    <PageLayout>
      <h1>Login</h1>
      <Form>
        <Input
          value={username}
          onChange={handleInputChange}
          type="text"
          name="username"
          placeholder="Username"
        />
        <Input
          value={password}
          onChange={handleInputChange}
          type="text"
          name="password"
          placeholder="Password"
        />
      </Form>
    </PageLayout>
  )
}

export default Login
