import React, { Component } from 'react';
const axios = require('axios');
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginRequestHandler() {
    //POST https://localhost:4000/users/login,
    //POST https://localhost:4000/users/logout,
    //GET https://localhost:4000/users/userinfo
   
    // TODO: 로그인 요청을 보내세요.
    // 로그인에 성공하면
    // - props로 전달받은 함수를 호출해, 로그인 상태를 변경하세요.
    // - GET /users/userinfo 를 통해 사용자 정보를 요청하세요
    //
    // 사용자 정보를 받아온 후
    // - props로 전달받은 함수를 호출해, 사용자 정보를 변경하세요.

    axios.post(`https://localhost:4000/users/login`,
    {
      userId: this.state.username,
      password: this.state.password
    },
    {
      "Content-Type": "application/json", 
      "withCredentials": true
    }).then(this.props.loginHandler())
    .then(axios.get(`https://localhost:4000/users/userinfo`,
      {
        "withCredentials": true
      })
      .then(res => {
        this.props.setUserInfo(res.data.data);
      })
    )
  }

  render() {
    return (
      <div className='loginContainer'>
        <div className='inputField'>
          <div>Username</div>
          <input
            name='username'
            onChange={(e) => this.inputHandler(e)}
            value={this.state.username}
            type='text'
          />
        </div>
        <div className='inputField'>
          <div>Password</div>
          <input
            name='password'
            onChange={(e) => this.inputHandler(e)}
            value={this.state.password}
            type='password'
          />
        </div>
        <div className='passwordField'>
          <button onClick={this.loginRequestHandler} className='loginBtn'>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;