import React from 'react';

class Login extends React.Component {
   username = null;

   constructor(props) {
       super(props);
       this.username = props.username || "";
       console.log("hey")
   }

   logout = () => {
       this.username = "";
       localStorage.removeItem("username");
       this.props.changeUsername("");
   }

   login = () => {
    localStorage.setItem("username", this.username);
    this.props.changeUsername(this.username);
   }

   render() {
    
    if(this.username) {
        return <div>
            { this.username }   
            <button onClick={this.logout}>Log Out</button>
        </div>
    }
    else {
        return <div>
          <input onChange={r => {this.username = r.target.value} }></input>
          <button onClick={this.login}>Login</button>     
        </div>
    }
   } 
}

export default Login;