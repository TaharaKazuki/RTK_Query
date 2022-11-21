import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Link as ReactRouteDomLink, useLocation } from 'react-router-dom'

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to right, #f8049c, #fdd54f);
  border-bottom: 3px solid #fdd54f;
`
const Menu = styled.nav`
  display: block;
  font-family: 'Open Sans';
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  padding: 8px;
  box-sizing: border-box;
  border-bottom: 3px solid #fdd54f;
  background: white;

  @media (min-width: 768px) {
    display: flex;
    position: relative;
    width: initial;
    border-bottom: none;
    margin: auto 0 auto auto;
    background: none;
    left: initial;
    top: initial;
  }
`

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

const StyledLink = styled(Link)<LinkStyleProps>`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  margin: auto 0;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: black;
`

const Header = () => {
  const { pathname } = useLocation()

  return (
    <HeaderWrapper>
      <Menu>
        <StyledLink to="/" isActive={pathname === '/'}>
          Home
        </StyledLink>
        <StyledLink to="/login" isActive={pathname === '/login'}>
          Login
        </StyledLink>
      </Menu>
    </HeaderWrapper>
  )
}

export default Header
