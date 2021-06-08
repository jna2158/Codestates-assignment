import axios from "axios";
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.loginRequestHandler = this.loginRequestHandler.bind(this);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginRequestHandler() {
    /*
    TODO: Login 컴포넌트가 가지고 있는 state를 이용해 로그인을 구현합니다.
    로그인을 담당하는 api endpoint에 요청을 보내고, 받은 데이터로 상위 컴포넌트 App의 state를 변경하세요.
    초기 App:
    state = { isLogin: false, accessToken: "" }
    로그인 요청 후 App:
    state = { isLogin: true, accessToken: 서버에_요청하여_받은_access_token }
    */
   axios.post(`https://localhost:4000/login`,
   {
     userId: this.state.userId,
     password: this.state.password
   },
   {
    "Content-Type": "application/json", 
    "withCredentials": true //withCredentials: true로 해서 CORS 요청에 쿠키값을 넣어주어야 한다.?
   })
   .then(res => {
     this.props.loginHandler(res.data);
     this.props.issueAccessToken(res)
   })
  }

  render() {
    return (
      <div className='loginContainer'>
        <div className='inputField'>
          <div>Username</div>
          <input
            name='userId'
            onChange={(e) => this.inputHandler(e)}
            value={this.state.userId}
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
        <div className='loginBtnContainer'>
          <button onClick={this.loginRequestHandler} className='loginBtn'>
            JWT Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
