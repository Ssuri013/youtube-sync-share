import React from 'react';
import './App.css';
import Player from './components/player.component';

class App extends React.Component {

 constructor() {
   super();
   this.state = { userName: "", login: false };
 }

 handleChangeInput = (event) => {
  this.setState({ userName: event.target.value });
 }

 login = () => {
   this.setState({login: true})
 }

  render() {
    let x = "Please enter Username";
    // if(this.state.userName.length > 0 && this.state.login) 
      x = <Player userName = {this.state.userName}></Player>;
    
      return (
      <div className = "App">
        <input value={this.state.userName} onChange={this.handleChangeInput} onKeyUp={this.handleKeyUp}></input>
        <button onClick={this.login}>Login</button>
        <header className = "App-header">
          {x}
        </header>
      </div>
    );
  }
 
}

export default App;
