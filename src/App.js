import React from 'react'
import styled from 'styled-components'
import { Router } from "@reach/router"

import Vote from './pages/Vote'
import VoteBoard from './pages/VoteBoard'

const AppRoot = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #222222;
  overflow: hidden;
`

const App = () => {
  return (
    <AppRoot>
      <Router>
        <Vote path="/" />
        <VoteBoard path="/vote-board" />
      </Router>
    </AppRoot>
  )
}

export default App
