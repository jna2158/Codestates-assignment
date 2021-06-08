import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.socialLoginHandler = this.socialLoginHandler.bind(this)

    // TODO: GitHub로부터 사용자 인증을 위해 GitHub로 이동해야 합니다. 적절한 URL을 입력하세요.
    // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.
    // 참고: https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps

    this.GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=bae3d383a8c4e1656c9a`
  }

  socialLoginHandler() {
    window.location.assign(this.GITHUB_LOGIN_URL)
  }

  render() {
    return (
      <div className='loginContainer'>
        OAuth 2.0으로 소셜 로그인을 구현해보세요.
        <img id="logo" alt="logo" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
        <button
          onClick={this.socialLoginHandler}
          className='socialloginBtn'
        >
          Github으로 로그인
          </button>
      </div>
    );
  }
}

export default Login;
