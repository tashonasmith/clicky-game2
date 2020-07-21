import React, { Component } from "react";
import './App.css';
import Wrapper from "./components/Wrapper/Wrapper";
import images from "./data/images.json";
import Header from "./components/Header/Header";
import Directions from "./components/Directions/Directions";
import ImageCard from "./components/Images/ImageCard";
import Message from "./components/Message/Message"
import Container from "./components/Container/Container"


function shuffleImages(array) {
  for (let i = array.length -1; i >0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

class App extends Component {
  state = {
    images,
    curScore: 0,
    topScore: 0,
    rightWrong: "",
    clicked: []
  }

  //if index of photo clicked within clicked array is undefined, execute handleIncrement and set state of clicked array to add the id of the photo to any data already existing in the array
  //if index of photo clicked is defined within the clicked array, execute handleReset
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement()
      this.setState({ clicked: this.state.clicked.concat(id) })
    }
    else {
      this.handleReset()
    }
  }

  handleIncrement = () => {
    const newScore = this.state.curScore + 1
    //set the state of the current score so that it is equal to newScore
    this.setState({
      curScore: newScore,
      rightWrong: ""
    })
    //if the new score is greater than or equal to the top score, set the state of the top score so that it is equal to the new score
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore })
    }
    //if the new score is equal to 12, set the state of rightWrong to "You win", and then execute handleSuffle
    else if (newScore === 12) {
      this.setState({  rightWrong: "You win!" })
    }
    this.handleShuffle()
  }

  //set state of everything back to original state to restart game, except to hold on to the top score and show the rightWrong message
  handleReset = () => {
    this.setState({
      curScore: 0,
      topScore: this.state.topScore,
      rightWrong: "You lost! Click any image to restart!",
      clicked: []
    })
  }

  handleShuffle = () => {
    let shuffledImages = shuffleImages(images)
    this.setState({ images: shuffledImages})
  }

  render() {
    return (
      <Wrapper>
        <Header score={this.state.curScore} topScore={this.state.topScore} />
        <Directions />
        <Message rightWrong={this.state.rightWrong} />
        <Container>
          {this.state.images.map(image => (
            <div className="card-container">
              <ImageCard key={image.id} handleClick={this.handleClick} handleIncrement={this.handleIncrement} handleReset={this.handleReset} handleShuffle={this.handleShuffle} id={image.id} image={image.image}
              />
            </div>
          ))}
        </Container>
        
      </Wrapper>
    )
  }
}

export default App
