import React from 'react'
import styled from 'styled-components'
import firebase from '../config/firebase'
import { FiX, FiChevronRight } from 'react-icons/fi'
import { Link } from '@reach/router'
import CatPic from '../components/CatPic'

const AppContainer = styled.div`
  color: white;
  display: flex;
  background-color: #222222;

  @media screen and (max-width: 45em) {
   flex-direction: column;
   align-items: center;
 }
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

  @media screen and (max-width: 45em) {
    width: 100vw;
    height: 50vh;
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
    width: 100%;
    background-color: rgba(136, 70, 70, .8);
    position: absolute;
    padding: .4em 1em;
    top: -30px;
    left: -15px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18em;
  top: 0;
  left: calc(50% - (18em / 2));
  padding: .8em;
  background-color: rgba(136, 70, 70, .8);
  color: rgba(255,255,255, .6);
  border-radius: 0 0 10px 10px;
  text-decoration: none;
  font-size: 1.2em;
  letter-spacing: 1px;
  transition: .3s;

  :hover {
    background-color: rgba(136, 70, 70, 1);
    color: rgba(255,255,255, .9);
  }

  svg {
    font-size: 1.4em;
    padding-left: .2em;
  }
`

class Vote extends React.Component {

  state = {
    data: [],
    dataLoaded: false,
    leftCat: {},
    rightCat: {},
    choosenCat: {
      id: "",
      imgUrl:"",
      vote: NaN,
    },
  }

  Next = () => {
    const db = firebase.firestore()

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
      this.setState({ data : allCats, dataLoaded: true, }, () => this.Next())
    })
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

    const { dataLoaded, leftCat, rightCat } = this.state

    return (
      <AppContainer>
        <SeeVotesButton to="/vote-board"> See the cutest cats <FiChevronRight /> </SeeVotesButton>
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
