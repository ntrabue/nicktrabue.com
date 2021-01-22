import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import Job from "../components/job"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Social from "../components/social"
import styled from "../components/styled"
import { useAvatarQuery } from "../components/useAvatarQuery"

type Props = PageRendererProps

const ThreeColumnSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  h3 {
    margin-top: 0px;
    margin-bottom: 8px;
  }
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    justify-self: center;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.green};
    margin-bottom: 0;
  }

  .bio {
    text-align: left;
    grid-column: 1 / span 2;
  }

  .details {
    text-align: right;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md + "px"}) {
    img {
      width: 200px;
      height: 200px;
    }
    .details {
      text-align: center;
    }
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
  const { imageData } = useAvatarQuery()

  return (
    <Layout location={props.location} title="Resume">
      <SEO title="Resume" />
      <h2>Profile:</h2>
      <ThreeColumnSection>
        <div className="pic-and-social">
          <img src={imageData.avatar.childImageSharp.fluid.src} />
          <Social />
        </div>
        <div className="details">
          <h3>Details:</h3>
          <BioDetail detail="Name" info="Nick Trabue" />
          <BioDetail detail="Current Location" info="Columbia, MO" />
          <BioDetail detail="Current Employer" info="EquipmentShare" />
        </div>
        <div className="bio">
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
      </ThreeColumnSection>
      <section>
        <h2>Careers:</h2>
        <Job
          place="EquipmentShare"
          date="Dec. 2020 - Present"
          title="Software Developer"
          description={<p>Currently working on internal tooling</p>}
          experience={[
            "JavaScript",
            "Typescript",
            "Python",
            "React",
            "Angular",
            "AWS",
          ]}
        />
        <Job
          place="CARFAX"
          date="Oct. 2019 - Dec. 2020"
          title="Product Developer"
          description={
            <p>
              The majority of my time at CARFAX was spent on the &nbsp;
              <a
                href="https://www.carfax.com/Service"
                rel="nofollow noopener noreferrer"
              >
                Car Care
              </a>
              &nbsp; web application. Near the end of my time at CARFAX I took
              part in larger company initiatives mostly focused around
              authentication, UI/UX and web accessibility.
            </p>
          }
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
          ]}
        />
        <Job
          place="Flat Branch Home Loans"
          date="May 2014 - Oct. 2019"
          description={
            <React.Fragment>
              <h4>IT Administrator</h4>
              <strong>2014-2017</strong>
              <p>
                My first four years at Flat Branch were spent in the IT
                department repairing and configuring computers for new
                employees. In 2017 Flat Branch Home Loans was looking for a web
                developer and I asked if I could fill the role with no prior
                experience.
              </p>
              <h4>Web &amp; Marketing Team Lead</h4>
<strong>2017-2019</strong>
              <p>
                As the sole developer at Flat Branch from 2017-2019, I was
                responsible for managing all of our internal and external web
                applications. Responsible for planning, developing, deploying
                and maintaining{" "}
                <a
                  href="https://www.flatbranchhomeloans.com"
                  rel="nofollow noopener noreferrer"
                >
                  flatbranchhomeloans.com
                </a>
                . As the marketing team lead, I acted as the liaison between the
                marketing team of 8 people and our hundreds of sales employees.
              </p>
            </React.Fragment>
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
      </section>
    </Layout>
  )
}

export default Resume
