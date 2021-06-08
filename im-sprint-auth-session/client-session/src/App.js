import React, { Component } from 'react';

import Login from './components/Login';
import Mypage from './components/Mypage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userData: null,
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  loginHandler() {
    this.setState({
      isLogin: true,
    });
  }

  setUserInfo(object) {
    this.setState({ userData: object });
  }

  logoutHandler() {
    this.setState({
      isLogin: false,
    });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className='App'>
        {isLogin ? (
          <Mypage
            logoutHandler={this.logoutHandler}
            userData={this.state.userData}
          />
        ) : (
            <Login
              loginHandler={this.loginHandler}
              setUserInfo={this.setUserInfo}
            />
          )}
      </div>
    );
  }
}

export default App;