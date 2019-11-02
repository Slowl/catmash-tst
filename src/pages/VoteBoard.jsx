import React from 'react'
import styled from 'styled-components'
import ResultCard from '../components/ResultCard'
import firebase from '../config/firebase'

const BoardContainer = styled.div`
  background-color: #131313;
  width: 35vw;
  height: 85vh;
  min-height: 85vh;
  max-height: 85vh;
  overflow-y: auto;
  margin: 3em auto;
  padding: 1em;
  border: 10px solid #131313;
  border-radius: 10px;
  box-shadow: 0px 1px 20px rgba(0,0,0, .6);

  scrollbar-color: rgba(255,255,255, .1) rgba(255,255,255,0);
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255, .1);
    border: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0, .15);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgba(0,0,0, .15);
  }
  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
    border: 0px none #ffffff;
  }
  ::-webkit-scrollbar-track:hover {
    background: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track:active {
    background: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
  padding: 1em;
  font-size: 1.2em;
  color: rgba(255,255,255, .5);
  letter-spacing: 1px;
  animation: mounted .2s ease forwards;

  @keyframes mounted {
    0% {opacity: 0;}
    100% {opacity: 100%;}
  }

  :after {
    display: inline-block;
    content: '';
    width: 6px;
    height: 6px;
    margin-left: .5em;
    border-radius: 50px;
    background-color: #b32626;
    opacity: 0;
    animation: .3s linear 0s infinite alternate loader;

    @keyframes loader {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  }
`

class VoteBoard extends React.Component {

  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount(){
    const db = firebase.firestore()
    const cats = db.collection('cats')

    cats.get()
    .then((querySnapshot) => {
      let allCats = []
      querySnapshot.forEach((cat) => {
        const reqData = cat.data()
        allCats.push(reqData)
      })
      this.setState({ data : allCats.sort((a,b)=> a.vote > b.vote ? -1 : 1) }, () => this.setState({isLoading: false}))
    })
  }

  render(){
    const {data, isLoading} = this.state
    return (
      <BoardContainer>
        {!isLoading ? (
          <div>{data.map((cat, key) => <ResultCard key={cat.id} imgUrl={cat.imgUrl} name={cat.id} votes={cat.vote} order={key} />) }</div>
        ): (
          <Loading>Loading data </Loading>
        )}
      </BoardContainer>

    )
  }
}

export default VoteBoard
