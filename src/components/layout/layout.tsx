import { css, Global } from "@emotion/core"
import Styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import { PageRendererProps } from "gatsby"
import React, { ReactNode, useEffect, useState } from "react"
import { rhythm } from "../../utils/typography"
import Nav from "../nav"
import { darkTheme, lightTheme } from "./theme"

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
  const [darkThemeActive, toggleDarkTheme] = useState(true)
  const { children } = props

  useEffect(() => {
    const getInitialColorPreference = (): boolean => {
      if (colorPreference && colorPreference === "light") {
        return false
      }
      return true
    }
    const colorPreference = localStorage?.getItem("theme")
    if (colorPreference) {
      toggleDarkTheme(getInitialColorPreference())
    }
  }, [])

  const activeTheme = darkThemeActive ? darkTheme : lightTheme

  function toggleDarkMode() {
    // these need to be oposites because we haven't changed the value of the hook yet
    localStorage.setItem("theme", darkThemeActive ? "light" : "dark")
    return toggleDarkTheme(!darkThemeActive)
  }

  return (
    <ThemeProvider theme={activeTheme}>
      <Global
        styles={css`
          html {
            background-color: ${activeTheme.colors.background};
          }
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
          h3,
          h4,
          li,
          span,
          strong,
          small {
            color: ${activeTheme.colors.text};
          }
          hr {
            background-color: ${activeTheme.colors.text}
          }
          code[class*="language-"],
          pre[class*="language-"] {
            color: #d6deeb;
            font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
              monospace;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            word-wrap: normal;
            line-height: 1.5;

            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;

            -webkit-hyphens: none;
            -moz-hyphens: none;
            -ms-hyphens: none;
            hyphens: none;
          }

          pre[class*="language-"]::-moz-selection,
          pre[class*="language-"] ::-moz-selection,
          code[class*="language-"]::-moz-selection,
          code[class*="language-"] ::-moz-selection {
            text-shadow: none;
            background: rgba(29, 59, 83, 0.99);
          }

          pre[class*="language-"]::selection,
          pre[class*="language-"] ::selection,
          code[class*="language-"]::selection,
          code[class*="language-"] ::selection {
            text-shadow: none;
            background: rgba(29, 59, 83, 0.99);
          }

          @media print {
            code[class*="language-"],
            pre[class*="language-"] {
              text-shadow: none;
            }
          }

          /* Code blocks */
          pre {
            padding: 1em;
            margin: 0.5em 0;
            overflow: auto;
          }

          :not(pre) > code,
          pre {
            color: white;
            background: #011627;
          }

          :not(pre) > code {
            padding: 0.1em;
            border-radius: 0.3em;
            white-space: normal;
          }

          .token.comment,
          .token.prolog,
          .token.cdata {
            color: rgb(99, 119, 119);
            font-style: italic;
          }

          .token.punctuation {
            color: rgb(199, 146, 234);
          }

          .namespace {
            color: rgb(178, 204, 214);
          }

          .token.deleted {
            color: rgba(239, 83, 80, 0.56);
            font-style: italic;
          }

          .token.symbol,
          .token.property {
            color: rgb(128, 203, 196);
          }

          .token.tag,
          .token.operator,
          .token.keyword {
            color: rgb(127, 219, 202);
          }

          .token.boolean {
            color: rgb(255, 88, 116);
          }

          .token.number {
            color: rgb(247, 140, 108);
          }

          .token.constant,
          .token.function,
          .token.builtin,
          .token.char {
            color: rgb(130, 170, 255);
          }

          .token.selector,
          .token.doctype {
            color: rgb(199, 146, 234);
            font-style: italic;
          }

          .token.attr-name,
          .token.inserted {
            color: rgb(173, 219, 103);
            font-style: italic;
          }

          .token.string,
          .token.url,
          .token.entity,
          .language-css .token.string,
          .style .token.string {
            color: rgb(173, 219, 103);
          }

          .token.class-name,
          .token.atrule,
          .token.attr-value {
            color: rgb(255, 203, 139);
          }

          .token.regex,
          .token.important,
          .token.variable {
            color: rgb(214, 222, 235);
          }

          .token.important,
          .token.bold {
            font-weight: bold;
          }

          .token.italic {
            font-style: italic;
          }

          .token.deleted {
            font-style: italic;
            color: #ef5350;
          }

          .token.inserted {
            font-style: italic;
            color: #addb67;
          }
        `}
      />
      <Nav darkMode={darkThemeActive} toggleDarkMode={toggleDarkMode} />
      <Content>
        <main>{children}</main>
      </Content>
    </ThemeProvider>
  )
}
