import React from 'react'
import styled from 'styled-components'
import firebase from './config/firebase'

import CatPic from "./components/CatPic"

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: white;
  display: flex;
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

class App extends React.Component {

  state = {
    data: [],
    dataLoaded: false,
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

    if (!!this.state.data && this.state.data.length > 0) {
      const index = this.state.data.length - 1
      this.setState({ leftCat: this.state.data[index], rightCat: this.state.data[index - 1]})
      this.setState(prevState => ({ data: prevState.data.slice(0, index - 1)}))
    }
    if (!!this.state.choosenCat.id && this.state.choosenCat.id.length > 0){
      db.collection("cats").doc(this.state.choosenCat.id).set({
        vote: this.state.choosenCat.vote
      }, { merge: true })
    }
  }

  ChooseACat = choosenCat => {
    this.setState({ choosenCat: { id: choosenCat.id, imgUrl: choosenCat.imgUrl, vote: choosenCat.vote + 1}}, () => this.Next())
  }

  render() {

    const { dataLoaded, leftCat, rightCat } = this.state

    return (
      <AppContainer>
        <CatContainer onClick={() => this.ChooseACat(leftCat)}>
          {!!dataLoaded && <CatPic url={leftCat.imgUrl} />}
        </CatContainer>
        <CatContainer isRight onClick={() => this.ChooseACat(rightCat)}>
          {!!dataLoaded && <CatPic url={rightCat.imgUrl} />}
        </CatContainer>
      </AppContainer>
    )
  }
}

export default App


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
