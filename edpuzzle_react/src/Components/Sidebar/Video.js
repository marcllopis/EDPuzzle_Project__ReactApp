import React from 'react';
import axios from 'axios';

const URLThumbnail1 = "http://img.youtube.com/vi/"
const URLThumbnail2 = "/0.jpg"
const youtubeAPI="AIzaSyAQB5pOVo_kkjWfE5y76PhrRPfTlf7ep9s"
let videoDuration;


class Video extends React.Component {

//since the duration is something related to that particular video, it will be stored and used on this component
  constructor(){
    super()
    this.state={duration:""}
  }

//I make the API call and store all the durations and also check, before storing them, if there's a video that has no duration.
//If so, it means this video is unavailable so using refs, I change the classes of the component to show it on a different way
  componentDidMount(){
    this.props.videos.map((video, index) =>{
      return axios.get('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + this.props.videos[this.props.index].videoId + '&key=' + youtubeAPI)
        .then(function (response) {
          if(response.data.items[0] === undefined){
            this.refs.unavailable.className = "text-center not-available"
            this.refs.unclickable.className = "container-fluid miniature-container no-click"
            this.refs.hideTitle.className = "hidden"
            this.refs.hideDuration.className = "hidden"

            videoDuration = "0:00"
          } else {
            videoDuration = response.data.items[0].contentDetails.duration.replace("PT", "").replace("M", ":").replace("S", "")//I convert the time to something readable
          }
          this.setState({duration: videoDuration})
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  render() {
    return (
      <div ref="unclickable" className="container-fluid miniature-container" key={this.props.videos[this.props.index].title}>
        <div ref="unavailable" className="hidden">NOT AVAILABLE</div>
        <div className="image-miniature-container">
          <div ref="hideDuration" className="duration-container">
            <h4>duration: {this.state.duration}</h4>
          </div>
          <div ref="hideTitle" className="title-container">
            <h5>by: {this.props.videos[this.props.index].author}</h5>
          </div>
          <img ref="miniature" onClick={function(){this.props.changeIndex(this.props.index)}.bind(this)} className="miniature img-responsive img-thumbnail" src={URLThumbnail1 + this.props.videos[this.props.index].videoId + URLThumbnail2} alt="miniature"/>
        </div>
        <h3 className="text-center video-title-miniature">{this.props.videos[this.props.index].title}</h3>
      </div>
    );
  }
};


export default Video;
