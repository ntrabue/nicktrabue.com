import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "../styled"

const SocialContainer = styled.div`
  display: flex;
  margin: 15px 0;
  text-align: center;
  justify-content: center;
  align-items: center;

  svg {
    margin: 0px 8px;
  }
`

const SocialLink = styled.a`
  text-decoration: none;
  font-size: 2rem;
  box-shadow: none;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`

const Social = () => {
  return (
    <SocialContainer>
      <SocialLink href="https://www.twitter.com/nicktrabue">
        <FontAwesomeIcon icon={faTwitter} />
      </SocialLink>
      <SocialLink href="https://github.com/ntrabue">
        <FontAwesomeIcon icon={faGithub} />
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/in/nicktrabue">
        <FontAwesomeIcon icon={faLinkedin} />
      </SocialLink>
    </SocialContainer>
  )
}

export default Social
