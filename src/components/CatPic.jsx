import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PicContainer = styled.div`
  width: ${props => props.picSize};
  height: ${props => props.picSize};
  border-radius: 300px;
  background-image: url(${props => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  border: ${props => props.largeBorder ? "10px" : "3px"} solid ${props => props.isRight ? "#131313" : "#282828"};
  background-size:cover;
  flex-shrink: 0;

  animation: mounted 1s ease forwards;

  @keyframes mounted {
    0% {opacity: 0;}
    100% {opacity: 100%;}
  }
`

PicContainer.defaultProps = {
  picSize: '18em',
  largeBorder: true,
}

const CatPic = ({ url, isRight, size, largeBorder }) => {
  return (
    <PicContainer bgImage={url} isRight={isRight} picSize={size} largeBorder={largeBorder}/>
  )
}

CatPic.propTypes = {
  url: PropTypes.string,
  isRight: PropTypes.bool,
  size: PropTypes.string,
  largeBorder: PropTypes.bool
}


export default CatPic
