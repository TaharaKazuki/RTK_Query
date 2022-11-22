import { FC } from 'react'
import { ReactNode } from 'react'
import { Button as StyledButton } from './styled'

type Props = {
  children: ReactNode
  secondary?: boolean
  large?: boolean
}

const Button: FC<Props> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>
}

export default Button
