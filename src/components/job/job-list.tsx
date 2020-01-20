import React from "react"
import styled from "../styled"

export const TechnologyList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
export const TechnologyBadge = styled.li`
  background-color: ${({ theme }) => theme.colors.green};
  margin: 3px 5px 0px 0px;
  padding: 2px 8px;
  border-radius: 3px;
`

interface ITechnologiesUsed {
  items: string[]
}

const TechnologiesUsed = ({ items }: ITechnologiesUsed) => {
  return (
    <div>
      <strong>Technologies Used:</strong>
      <br />
      <TechnologyList>
        {items.map((item: string) => (
          <TechnologyBadge key={item}>{item}</TechnologyBadge>
        ))}
      </TechnologyList>
    </div>
  )
}

export default TechnologiesUsed
