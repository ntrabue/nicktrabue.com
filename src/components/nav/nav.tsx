import { faHome, faThList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React from "react"
import styled from "../styled"

const NavLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  color: #53565a;
  font-size: 1rem;
  padding: 5px 10px;

  svg {
    margin-right: 5px;
  }

  &:hover {
    border-radius: 3px;
    border-radius: 8px;
    background: rgba(226, 227, 228, 0.4);
  }

  &.active {
    color: ${({ theme }) => theme.colors.pink};
  }
`

const NavContainer = styled.div`
  display: flex;
  margin: 10px 5px;
`

const Nav = () => {
  return (
    <NavContainer>
      <NavLink to="/" activeClassName="active">
        <FontAwesomeIcon icon={faHome} />
        Home
      </NavLink>
      <NavLink to="/resume" activeClassName="active">
        <FontAwesomeIcon icon={faThList} />
        Resume
      </NavLink>
      {/* <NavLink to="/blog" activeClassName="active">
        <FontAwesomeIcon icon={faBook} />
        Blog
      </NavLink> */}
    </NavContainer>
  )
}

export default Nav
