import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

import '../App.css';

const URL_YT="https://www.youtube.com/watch?v="
let counterInterval = 0;

//This component will get the video the user clicked via props and with the Youtube component, will call different methods to control when to show a question
class Main extends Component {

  constructor(){
    super()
    this.state={currentQuestion:""}

    this._onPlay = this._onPlay.bind(this)
    this._onStateChange = this._onStateChange.bind(this)
    this.hidepopup = this.hidepopup.bind(this)
  }

//When the user clicks on the question popup button, the question will get a class to be defined as display:none
  hidepopup(){
    this.refs.visible.className = "hidden-question"
  }

//This method will be triggered everytime the user plays the video.
//Here I'll check, every second, the current time of the video and if it match a question time, the question popup will appear
  _onPlay(event) {
    counterInterval = setInterval(() => {
      this.props.videos[this.props.videoIndex].questions.forEach((question, index) =>{
        if(Math.floor(event.target.getCurrentTime()) === question.time){
          this.refs.visible.className = "show-question"
          event.target.pauseVideo()
          this.setState({currentQuestion:question.questionId.body})
        }
      })
    }, 1000);
  }

//Everytime the state of the video change (so it's paused, buffering...), I'll clear the interval created on the _onPlay method
  _onStateChange(event){
    if(event.target.getPlayerState() !== 1){
      clearInterval(counterInterval)
    }
  }

  render() {

    const opts = {
          height: '615',
          width: '920',
          playerVars: {
            autoplay: 0
          }
        }
//using the bootstrap package I create a button that will display the current URL of the video on a right side popup
    const popoverRight = (
      <Popover id="popover-positioned-right" title="Share this video">
        {URL_YT + this.props.videos[this.props.videoIndex].videoId}
      </Popover>
    );

    return (
      <div className="main-part">
        <div className="edpuzzle-logo">
          <img src="https://edpuzzle.imgix.net/edpuzzle-logo-white.png" alt=""/>
        </div>
        <div>
          <h4 className="main-video-nowPlaying">Now playing: <span className="main-video-title">{this.props.videos[this.props.videoIndex].title}</span></h4>
          <YouTube
                  videoId={this.props.videos[this.props.videoIndex].videoId}
                  opts={opts}
                  onPlay={this._onPlay}
                  onStateChange={this._onStateChange}
                  className="main-video"
          />
          <div ref="visible" id="question-popup" className="hidden-question"><h3>QUESTION!</h3><hr/><br/><br/><p> - {this.state.currentQuestion} </p><br/><button onClick={function(){this.hidepopup()}.bind(this)} id="keep-video" className="btn btn-info btn-show-video">Go Back</button> </div>
          <div className="share-container">
            <OverlayTrigger trigger="click" placement="right" overlay={popoverRight}>
              <Button className="btn-share">Share it!</Button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
