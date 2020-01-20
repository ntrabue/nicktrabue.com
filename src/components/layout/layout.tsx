import { css, Global } from "@emotion/core"
import Styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import { PageRendererProps } from "gatsby"
import React, { ReactNode } from "react"
import { rhythm } from "../../utils/typography"
import Nav from "../nav"
import { theme } from "./theme"

interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const Content = Styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0px 12px;
  max-width: ${rhythm(26)};
`

export const Layout = (props: Props) => {
  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.3rem;
          }
          h3 {
            font-size: 1.8rem;
          }
          p {
            font-size: 1rem;
          }
          p,
          a,
          h1,
          h2,
          h3 {
            color: ${theme.colors.text};
          }
        `}
      />
      <Nav />
      <Content>
        <main>{children}</main>
      </Content>
    </ThemeProvider>
  )
}
