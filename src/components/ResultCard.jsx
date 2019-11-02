import React from 'react'
import styled from 'styled-components'
import CatPic from './CatPic'

const CardContainer = styled.div`
  background-color: ${props => {
    if(props.catOrder === 0){
      return '#d6af36'
    } else if(props.catOrder === 1){
      return '#a7a7ad'
    } else if (props.catOrder === 2){
      return '#a77044'
    } else {
      return '#0f0f0f'
    }
    }};
  width: 90%;
  margin: 1em auto;
  padding: 1em;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`
const CatInfo = styled.div`
  width: 100%;
  padding: .8em 1.4em;
  color: white;
  letter-spacing: 1px;

  .name {
    font-size: 1.5em;
  }

  .score {
    font-size: 1.15em;
    font-weight: bolder;
  }
`

const ResultCard = ({ imgUrl, name, votes, order }) => {
  return (
    <CardContainer catOrder={order}>
      <CatPic url={imgUrl}
      size="6em"
      largeBorder={false} />
      <CatInfo>
        <div className="name"> {name} </div>
        <div className="score"> {votes} votes </div>
      </CatInfo>
    </CardContainer>
  )
}

export default ResultCard
