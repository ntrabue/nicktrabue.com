import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import Job from "../components/job"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Social from "../components/social"
import styled from "../components/styled"

type Props = PageRendererProps

const ThreeColumnSection = styled.section`
  display: grid;
  text-align: center;
  h3 {
    margin-top: 0px;
    margin-bottom: 8px;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    justify-self: center;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.green};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg + "px"}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 4%;
    text-align: left;
  }
`

interface IDetails {
  detail: string
  info: string
}

const BioDetail = ({ detail, info }: IDetails) => (
  <p>
    <strong>{detail}:</strong>
    <br />
    <span>{info}</span>
  </p>
)

const Resume = (props: Props) => {
  const data = useStaticQuery(graphql`
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

  return (
    <Layout location={props.location} title="Resume">
      <SEO title="Resume" />
      <h2>Profile:</h2>
      <ThreeColumnSection>
        <img src={data.avatar.childImageSharp.fluid.src} />
        <div>
          <h3>Bio:</h3>
          <p>
            I enjoy writing quality, readable code that translates to effective
            efficient, and enjoyable user experiences.
          </p>
          <p>
            When I'm not writing code, you'll find me wrangling my three
            daughters or playing video games.
          </p>
        </div>
        <div>
          <h3>Details:</h3>
          <BioDetail detail="Name" info="Nick Trabue" />
          <BioDetail detail="Current Location" info="Columbia, MO" />
          <BioDetail detail="Current Employer" info="CARFAX" />
          <Social />
        </div>
      </ThreeColumnSection>
      <section>
        <h2>Careers:</h2>
        <Job
          place="CARFAX"
          date="Oct. 2019 - Present"
          title="Product Developer"
          description={<p>Currently on the consumer development team.</p>}
          experience={[
            "JavaScript",
            "Typescript",
            "React",
            "GraphQL",
            "Apollo Client",
            "Express",
            "Jest",
            "Enzyme",
            "React Testing Library",
            "Webpack",
            "JFrog",
            "Java",
            "Groovy",
            "AWS",
            "Docker",
            "Kubernetes",
            "Jenkins",
            "Postgresql",
            "Git",
            "Jira",
            "Confluence",
          ]}
        />
        <Job
          place="Flat Branch Home Loans"
          date="June 2017 - Oct. 2019"
          title="Web Developer &amp; Marketing Team Lead"
          description={
            <p>
              As the sole developer at Flat Branch, I was responsible for
              managing all of our internal and external web applications.
              Responsible for planning, developing, deploying and maintaining{" "}
              <a href="https://www.flatbranchhomeloans.com">
                flatbranchhomeloans.com
              </a>
              . As the marketing team lead, I acted as the liaison between the
              marketing team of 8 people and our hundreds of sales employees.
            </p>
          }
          experience={[
            "JavaScript",
            "Vue",
            "MongoDB",
            "Express",
            "Pug",
            "Mongoose",
            "React",
            "Nuxt.js",
            "Gatsby",
            "Mocha",
            "Jest",
            "Netlify",
            "DigitalOcean",
            "AWS",
            "S3",
            "CI/CD Tools",
            "Zendesk",
            "Git",
            "Google Map API",
            "Google OAuth 2.0",
            "PHP",
            "Wordpress",
          ]}
        />
        <Job
          place="Flat Branch Home Loans"
          date="May 2014 - June 2017"
          title="IT Administrator"
          description={
            <p>
              Responsible for maintaining and managing computer infrastructure
              at all locations. Participates in technical research and
              development. Coordinate with third party vendors to assure network
              and vendor continuity. Assist project teams with technical issues
              in the initiation and planning phases of our standard project
              management methodology. Support of operations and sales staff in
              executing, testing and rolling-out solutions.
            </p>
          }
          experience={[
            "AWS",
            "EC2",
            "Wordpress",
            "Zendesk",
            "Google Apps for Business",
            "Windows Server 2008",
            "Windows Server 2016",
            "Ubuntu",
            "Powershell",
            "Azure",
            "Active Directory",
            "MDM",
            "Windows 10",
            "Windows 8",
            "Windows 7",
            "iOS/Android",
            "Microsoft Office",
            "Zapier",
          ]}
        />
      </section>
    </Layout>
  )
}

export default Resume
