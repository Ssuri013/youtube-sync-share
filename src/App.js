import React from 'react';
import './App.css';
import Player from './components/player.component';

class App extends React.Component {

 

  render() {

    return (
      <div className = "App">
        <header className = "App-header">
          <Player></Player>
        </header>
      </div>
    );
  }

}

export default App;
