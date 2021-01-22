import React from "react"
import styled from "../styled"
import TechnologiesUsed from "./job-list"

interface IJob {
  place: string
  date: string
  title?: string
  description: JSX.Element
  experience: string[]
}

const JobContainer = styled.div`
  display: grid;
  margin: 10px 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg + "px"}) {
    grid-template-columns: 2fr 3fr;
    grid-column-gap: 3%;
  }

  h4 {
    margin: 10px 0;
  }
`

const Location = styled.h3`
  margin: 0px;
  font-size: 1.6rem;
`

const Title = styled.h4`
  margin: 10px 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg + "px"}) {
    margin-top: 0px;
  }
`

const Job = ({ place, date, title, description, experience }: IJob) => {
  return (
    <JobContainer>
      <div>
        <Location>{place}</Location>
        <span>{date}</span>
      </div>
      <div>
        {title && <Title>{title}</Title>}
        {description}
        <TechnologiesUsed items={experience} />
      </div>
    </JobContainer>
  )
}

export default Job
