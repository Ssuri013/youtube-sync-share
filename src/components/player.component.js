import React from 'react';
import YouTube from 'react-youtube';
// import { start } from 'repl';

class Player extends React.Component {

    constructor(props) {
        super(props);
        let ws = new WebSocket('ws://localhost:8000');
        this.state = { ws, videoId: '', seekTo: 0, username: props.username };
    }

    componentDidMount() {

        // Connection opened
        this.state.ws.addEventListener('open', (event) => {
            this.state.ws.send(JSON.stringify({username: this.state.username}));
        });

        // Listen for messages
        this.state.ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log('Message from server ', data);
            this.setState({ ...data });
        });

    }

    componentWillUpdate(nextProps, nextState) {
        //handle lag of 500ms
        if(Math.abs(nextState.seekTo - this.state.seekTo) < 2) {
            return false
        }
        return true;
    }

    newURL = (e) => {
        const vidURL = e.target.value.substr(e.target.value.indexOf('?v=')+3);
        this.setState({videoId: vidURL})
        this.state.ws.send(JSON.stringify({
            seekTo: 0,
            videoId: vidURL
        }))
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                start: this.state.seekTo
            },
        };
        console.log("state render", this.state.seekTo)
        return (
            <div>
                <input type="text" hint="video URL" onChange={this.newURL}></input> <button>change</button>
                <YouTube
                    videoId={this.state.videoId || '7rnaZT_q4fQ'}
                    opts={opts}
                    onReady={this.onReady}
                    onStateChange={this.stateChanged}
                />
            </div>
        );
    }

    stateChanged = (event) => {
        //ready to receive msgs
        console.log(event.target.getCurrentTime())
        if (event.target.getCurrentTime() !== 0 && this.state.ws.readyState === 1 && Math.abs(event.target.getCurrentTime() - this.state.seekTo) > 40 ) {
            this.state.ws.send(JSON.stringify({
                seekTo: event.target.getCurrentTime(),
                videoId: this.state.videoId
            }))
        }
    }

    onReady(event) {
        event.target.setVolume(0); // for development as it annoys me
    }

}

export default Player;