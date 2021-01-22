import { graphql, useStaticQuery } from "gatsby"

interface IUseAvatarQueryReturn {
  imageData: any
}

export const useAvatarQuery = (): IUseAvatarQueryReturn => {
  const imageData = useStaticQuery(graphql`
    query AvatarQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 267) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return {
    imageData,
  }
}
