import React from "react"
import Social from "../social"
import styled from "../styled"
import { useAvatarQuery } from "../useAvatarQuery"

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  justify-self: center;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.green};
  margin-bottom: 0;
  margin-right: 25px;
`

const BioWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  div {
    text-align: center;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    text-align: center;
  }
`

const BlogBio = () => {
  const { imageData } = useAvatarQuery()

  return (
    <BioWrapper>
      <Avatar src={imageData.avatar.childImageSharp.fluid.src} />
      <div>
        <p>Nick Trabue</p>
        <Social />
      </div>
    </BioWrapper>
  )
}

export default BlogBio
