import styled from "@emotion/styled"
import { PageRendererProps } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Social from "../components/social"

type Props = PageRendererProps

const IndexContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`

const Greeting = styled("div")`
  display: block;
  text-align: center;
  h1 {
    font-weight: normal;
    margin: 8px 0;
  }
  h3 {
    margin: 0px;
    font-weight: normal;
  }
`

const Index = (props: Props) => {
  return (
    <Layout location={props.location} title="Nick Trabue - Javascript Dev">
      <SEO title="🏠" />
      <IndexContainer>
        <Greeting>
          <h1>
            <strong>👋 Hello World!</strong>
            <br />
            I'm Nick Trabue
          </h1>
          <h3>I like building things with JavaScript</h3>
          <Social />
        </Greeting>
      </IndexContainer>
    </Layout>
  )
}

export default Index
