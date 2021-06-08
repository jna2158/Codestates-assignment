import React, { Component } from "react";

import Login from "./components/Login";
import Mypage from "./components/Mypage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: "",
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.issueAccessToken = this.issueAccessToken.bind(this);
  }

  
  loginHandler(data) {
    this.setState({
      isLogin: true
    })
  }

  issueAccessToken(token) {
    this.setState({
      accessToken: token
    })
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className='App'>
        {isLogin? (
          <Mypage
            issueAccessToken={this.issueAccessToken}
            accessToken={this.state.accessToken}
          />
        ) : (
          <Login
            loginHandler={this.loginHandler}
            issueAccessToken={this.issueAccessToken}
          />
        )}
      </div>
    );
  }
}

export default App;
