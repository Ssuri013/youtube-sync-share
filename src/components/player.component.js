import React from 'react';
import YouTube from 'react-youtube';
import { start } from 'repl';
 
class Player extends React.Component {

  constructor() {
    super();
    let ws = new WebSocket('ws://localhost:8000');
    this.state = { ws, videoId: '', seekTo: 0 };
  }

  componentDidMount() {

    // Connection opened
    this.state.ws.addEventListener('open', (event) => {
      // this.state.ws.send({username: this.props.userName || 'bypassed name'});
    });

    // Listen for messages
    this.state.ws.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      this.setState({...event.data});
      event.target.seekTo(event.data);
    });

  }

  componentWillUpdate(nextProps, nextState) {
    //handle lag of 500ms
    
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        // start: this.state.seekTo
      }
    };
    let x = 'Connecting to your peers';
    if (this.state.ws.readyState==1) {
      x = this.state.videoId.length > 0? '': 'Select a video to start with';
    }

    return (
      <div>
        { x }
        <YouTube
          videoId={this.state.videoId || 'b0v-X9pcSos'}
          opts={opts}
          onReady={this.onReady}
          onStateChange={this.stateChanged}
        />
      </div>
    );
  }
 
  stateChanged = (event)=> {
    //ready to receive msgs
    if(this.state.ws.readyState == 1) { 
        this.state.ws.send( JSON.stringify({seekTo: event.target.getCurrentTime(), videoId: this.state.videoId}))
    }    
  }

  onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    event.target.setVolume(0); // for development as it annoys me
     // accepts int seconds
    // console.log(event);
  }

}

export default Player;