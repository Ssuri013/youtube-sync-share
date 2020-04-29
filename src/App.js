import React from 'react';
import './App.css';
import Player from './components/player.component';
import Login from './components/login.component';

class App extends React.Component {

    constructor() {
        super();
        this.state = { username: localStorage.getItem("username") || "" };
    }

    loginChange = (str) => {
        if (str !== this.state.username)
            this.setState({ username: str })
    }

    render() {
        let body = "Please enter Username";
        if (this.state.username.length > 0)
            body = <Player username={this.state.username}></Player>;
        return (
            <div className="App">
                <Login username={this.state.username} changeUsername={this.loginChange}></Login>
                <header className="App-header">
                    {body}
                    {this.state.username}
                </header>
            </div>
        );
    }

}

export default App;
