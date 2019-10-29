import React from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  width: 100vw;
  background-color: #131313;
  color: white;
`

class App extends React.Component {

  state = {
    data: [],
  }

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://latelier.co/data/cats.json')
    .then(res => res.json())
    .then(dataCats => this.setState({data : dataCats.images}))
  }

  render() {

    const {data} = this.state

    return (
      <AppContainer>

      </AppContainer>
    )
  }
}

export default App
