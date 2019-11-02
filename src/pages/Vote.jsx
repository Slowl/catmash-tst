import React from 'react'
import styled from 'styled-components'
import firebase from '../config/firebase'
import { FiX } from "react-icons/fi"
import { Link } from "@reach/router"

import CatPic from "../components/CatPic"


const AppContainer = styled.div`
  color: white;
  display: flex;
  background-color: #222222;
`

const CatContainer = styled.div`
  background-color: ${props => props.isRight ? "#222222" : "#131313"};
  z-index: ${props => props.isRight ? "0" : "1"};
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  transition: .3s;

  :hover {
    transform: scale(1.03);
  }
`

const WelcomeScreen = styled.div`
  width: 100%;
  background-color: #222222;
  padding: 8em 0 2em;
  text-align: center;
  color: white;

  div {
    font-size: 4em;
    letter-spacing: 20px;
  }

  span {
    font-size: .8em;
  }

  .start {
    font-size: 1.2em;
    letter-spacing: 3px;
    text-transform: uppercase;
    background-color: #131313;
    width: 12%;
    padding: 1em 0;
    margin: 5em auto;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: .4s;

    :hover {
      box-shadow: 0px 1px 20px rgba(255,255,255, .1);
    }
  }
`

const NoneButton = styled.div`
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: calc(50% - 65px) ;
  height: 45px;
  width: calc(65px * 2);
  border-top-left-radius: calc(65px * 2);
  border-top-right-radius: calc(65px * 2);
  background-color: rgba(136, 70, 70, .5);
  color: rgba(255,255,255, .6);
  text-align: center;
  font-size: 2.3em;
  letter-spacing: 2px;
  padding-top: .5em;
  cursor: pointer;
  transition: .3s;

  :hover {
    background-color: rgba(136, 70, 70, .8);
    color: rgba(255,255,255, .9);
  }

  :before {
    content: "both ugly";
    display: block;
    background-color: rgba(136, 70, 70, .8);
    position: absolute;
    padding: .4em 1em;
    top: -30px;
    left: 10px;
    border-radius: 8px;
    opacity: 0;
    font-size: .5em;
    letter-spacing: 1px;
    transition: .3s;
  }

  :hover:before {
    top: -38px;
    opacity: 1;
  }
`

const SeeVotesButton = styled(Link)`
  z-index: 4;
  position: absolute;
  width: 18em;
  top: 0;
  left: calc(50% - (18em / 2));
  padding: .7em 0;
  background-color: rgba(136, 70, 70, .8);
  color: rgba(255,255,255, .6);
  border-radius: 0 0 10px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1.2em;
  letter-spacing: 1px;
  transition: .3s;

  :hover {
    background-color: rgba(136, 70, 70, 1);
    color: rgba(255,255,255, .9);
  }
`

class Vote extends React.Component {

  state = {
    data: [],
    dataLoaded: false,
    displayApp: false,
    leftCat: "",
    rightCat: "",
    choosenCat: {
      id: "",
      imgUrl:"",
      vote: NaN,
    },
  }

  componentDidMount() {
    const db = firebase.firestore()
    const cats = db.collection('cats')

    cats.get()
    .then((querySnapshot) => {
      let allCats = []
      querySnapshot.forEach((cat) => {
        const reqData = cat.data()
        allCats.push(reqData)
      })
      this.setState({ data : allCats, dataLoaded: true, })
    })
  }

  Next = () => {
    const db = firebase.firestore()
    this.setState({ displayApp: true })

    if (!!this.state.data && this.state.data.length > 0) {
      const index = this.state.data.length - 1
      this.setState({ leftCat: this.state.data[index], rightCat: this.state.data[index - 1]})
      this.setState(prevState => ({ data: prevState.data.slice(0, index - 1)}))

      if (!!this.state.choosenCat.id){
        db.collection("cats").doc(this.state.choosenCat.id).set({
          vote: this.state.choosenCat.vote
        }, { merge: true })
      }
    }
  }

  ChooseACat = choosenCat => {
    this.setState({ choosenCat: { id: choosenCat.id, imgUrl: choosenCat.imgUrl, vote: choosenCat.vote + 1}}, () => this.Next())
  }

  NoVote = () => {
    if (!!this.state.data && this.state.data.length > 0) {
      const index = this.state.data.length - 1
      this.setState({ leftCat: this.state.data[index], rightCat: this.state.data[index - 1]})
      this.setState(prevState => ({ data: prevState.data.slice(0, index - 1)}))
    }
  }

  render() {

    const { dataLoaded, leftCat, rightCat, displayApp } = this.state

    return (
      <div>
        {!!displayApp ?
          <AppContainer>
            <SeeVotesButton to="/vote-board"> See the cutest cats </SeeVotesButton>
            <CatContainer onClick={() => this.ChooseACat(leftCat)}>
              {!!dataLoaded && <CatPic url={leftCat.imgUrl} />}
            </CatContainer>
            <CatContainer isRight onClick={() => this.ChooseACat(rightCat)}>
              {!!dataLoaded && <CatPic url={rightCat.imgUrl} isRight />}
            </CatContainer>
            <NoneButton onClick={() => this.NoVote()}>
              <FiX />
            </NoneButton>
          </AppContainer>
        :
          <WelcomeScreen>
            <div>CATMASH</div>
            <span> juste un workaround :)</span>
            <div className="start" onClick={() => this.Next()}> start </div>
          </WelcomeScreen>
        }
      </div>
    )
  }
}

export default Vote

// getting data from latelier to post it on firestore
// const db = firebase.firestore()
// const cats = db.collection('cats')
// fetch('https://cors-anywhere.herokuapp.com/https://latelier.co/data/cats.json')
// .then(res => res.json())
// .then(dataCats => {
//   dataCats.images.forEach(cat => {
//     db.collection("cats").doc(cat.id).set({
//       id: cat.id,
//       imgUrl: cat.url,
//       vote: 0,
//     })
//   })
// })
