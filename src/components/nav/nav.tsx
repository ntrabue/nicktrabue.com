import { faBook, faHome, faThList, faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTheme } from "emotion-theming"
import { Link } from "gatsby"
import React from "react"
import Switch from "react-switch"
import { ITheme } from "../layout/theme"
import styled from "../styled"


const NavLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.text};
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
  max-width: 80%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
`

const StyledSwitch = styled(Switch)`
  margin-left: auto;
  border: 1px solid #fff;
`

const MoonIcon = styled(FontAwesomeIcon)`
  color: #f9d71c;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 25px;
  padding-left: 5px;
`

const SunIcon = styled(FontAwesomeIcon)`
  color: #fff000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 25px;
`

interface INav {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Nav = ({ darkMode, toggleDarkMode }: INav) => {
  const theme: ITheme = useTheme()
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
      <NavLink to="/blog" activeClassName="active">
        <FontAwesomeIcon icon={faBook} />
        Blog
      </NavLink>
      <StyledSwitch
        onChange={toggleDarkMode}
        checked={darkMode}
        checkedIcon={<MoonIcon icon={faMoon} />}
        uncheckedIcon={<SunIcon icon={faSun} />}
        offColor={"#879ceb"}
        onColor={theme.colors.background}

      />
    </NavContainer>
  )
}

export default Nav
