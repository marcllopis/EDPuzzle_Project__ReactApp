import React from 'react';
import Video from './Video'

import '../../App.css';

//this component has no state so I can write it as a Javascript function, this will it will be rendered faster cause it doesnt need to be compiled
//this component will create as many video components as videos I have on the main videos state

const Sidebar = (props) => {
  return(
    <div className="col-md-2 sidebar">
      {props.videos.map((video, index) =>{
        return (
          <Video key={index}
                 index={index}
                 changeIndex={props.changeIndex}
                 videos={props.videos}
          />
        )
      })}
    </div>
  )
}
export default Sidebar;
