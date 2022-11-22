import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Link as ReactRouteDomLink } from 'react-router-dom'

type LinkStyleProps = {
  isActive?: boolean
  to: string
}

type LinkProps = {
  children: ReactNode
} & LinkStyleProps

const Link = ({ isActive, children, to, ...props }: LinkProps) => {
  return (
    <ReactRouteDomLink to={to} {...props}>
      {children}
    </ReactRouteDomLink>
  )
}

export const StyledLink = styled(Link)<LinkStyleProps>`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  margin: auto 0;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: black;
`
