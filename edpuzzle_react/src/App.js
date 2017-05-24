import React, { Component } from 'react';
import axios from 'axios'; //package used for API calls
import Sidebar from './Components/Sidebar/Sidebar';
import Main from './Components/Main';
import './App.css';


class App extends Component {

// I need to set a state where I'll store all videos and also the index of the video the user wants to see
  constructor(props) {
    super(props);
    this.state = { videos: undefined, videoIndex: 0} ;

    this.changeIndex = this.changeIndex.bind(this)
  }

//I make an API call to the server to get the JSON with all videos and store it on the state
  componentDidMount() {
    axios.get('http://localhost:4000/')
      .then(function (response) {
        let videos = response.data.media
        this.setState({ videos })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
//Method to grab the index of the video that the user clicked and store it on the App state
  changeIndex(index){
    this.setState({videoIndex:index})
  }

  render() {
    if(this.state.videos === undefined){
      return false //it returns nothing if videos still not loaded
    }
    //Both components will send the state and methods needed to their childs as props
    return (
      <div>
        <Sidebar videos={this.state.videos}
                 changeIndex={this.changeIndex}
        />
        <Main videos={this.state.videos}
              videoIndex={this.state.videoIndex}
        />
      </div>
    );
  }
}


export default App;
