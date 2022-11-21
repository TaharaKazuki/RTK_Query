import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  children: ReactNode
}

const Button2 = ({ children }: Props) => {
  return <button>{children}</button>
}

const largeStyle = css`
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
`

const normalStyle = css`
  padding: 8px;
  border-radius: 4px;
  font-size: 1rem;
`

type ButtonProps = {
  secondary?: boolean
  large?: boolean
}

const Button = styled.button<ButtonProps>`
  color: white;
  background: ${({ secondary }) => (secondary ? 'black' : '#f8049c')};
  ${({ large }) => (large ? largeStyle : normalStyle)}
  font-weight: bold;
  box-shadow: none;
  border: none;
  width: 100%;
  display: block;
  white-space: none;

  &:disabled {
    background: #eee;
    color: #666;
  }
`

export { Button, Button2 }
