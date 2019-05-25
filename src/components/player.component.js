import React from 'react';
import YouTube from 'react-youtube';
 
class Player extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
 
    return (
      <YouTube
        videoId="hWFDujYzvbI"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    event.target.setVolume(0); // for development as it annoys me
    event.target.seekTo(60); // accepts int seconds
    console.log(event);
  }
}

export default Player;