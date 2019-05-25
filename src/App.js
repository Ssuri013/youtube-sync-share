import React from 'react';
import './App.css';
import Player from './components/player.component';

class App extends React.Component {
  
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
      const socket = new WebSocket('ws://localhost:8000');

      // Connection opened
      socket.addEventListener('open', function (event) {
          socket.send('Hello Server!');
      });
      
      // Listen for messages
      socket.addEventListener('message', function (event) {
          console.log('Message from server ', event.data);
      });  
  }

  render(){
    
    return (
      <div className="App">
      <header className="App-header">
        <Player></Player>      
      </header>
    </div>
  );
}

}

export default App;
