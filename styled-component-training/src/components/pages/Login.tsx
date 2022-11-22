import { useState, ChangeEvent } from 'react'
import { PageLayout, Input, PasswordInput } from 'components/common'
import styled from 'styled-components'

const Form = styled.div`
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
    e.persist()
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
        <PasswordInput value={password} onChange={handleInputChange} name="password" />
      </Form>
    </PageLayout>
  )
}

export default Login
