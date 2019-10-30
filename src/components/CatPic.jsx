import React from 'react'
import styled from 'styled-components'

const PicContainer = styled.div`
  width: 18em;
  height: 18em;
  border-radius: 300px;
  background-color: transparent;
  background-image: url(${props => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size:cover;
  border: 7px solid #dddddd;
  animation: mounted 1s ease forwards;

  @keyframes mounted {
    0% {opacity: 0;}
    100% {opacity: 100%;}
  }
`

const CatPic = ({ url }) => {
  return (
    <PicContainer bgImage={url} />
  )
}

export default CatPic
