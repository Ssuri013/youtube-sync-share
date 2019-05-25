import React from 'react';
import YouTube from 'react-youtube';
 
class Player extends React.Component {

  constructor() {
    super();
    let ws = new WebSocket('ws://localhost:8000');
    this.state = {ws};
  }

  componentDidMount() {
    // fetch("http://localhost:8000/login")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       // this.setState({
    //       //   isLoaded: true,
    //       //   items: result.items
    //       // });
    //       console.log('in call rsponse');
    //       debugger;
    //       console.log(result, "ss");
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.log("err aaya");
    //     }
    //   );
    

    // Connection opened
    this.state.ws.addEventListener('open', (event) => {
      this.state.ws.send('Hello Server!');
    });

    // Listen for messages
    this.state.ws.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
      
    });
  }

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
        onStateChange={this.stateChanged}
      />
    );
  }
 
  stateChanged = (event)=> {
    console.log(event); // can be used to get current state and pause and play task 
    event.target.getCurrentTime();
    this.state.ws.send(event.target.getCurrentTime());
    // send this to server and broadcast it
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