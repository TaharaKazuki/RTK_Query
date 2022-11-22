import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { StyledLink as Link } from '../Link'
import { HeaderWrapper, MobileMenuIcon, Menu } from './styled'

const Header = () => {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setMenuOpen((status) => !status)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>

      <Menu open={menuOpen}>
        <Link to="/" isActive={pathname === '/'}>
          Home
        </Link>
        <Link to="/login" isActive={pathname === '/login'}>
          Login
        </Link>
      </Menu>
    </HeaderWrapper>
  )
}

export default Header
