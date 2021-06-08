import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Mypage from './components/Mypage';
import axios from 'axios';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      accessToken: ''
    };
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  async getAccessToken(authorizationCode) {
    await axios.post(`http://localhost:8080/callback`,
    {
      authorizationCode: authorizationCode
    })
    .then(data => {
      this.setState({
        isLogin: true,
        accessToken: data.data.accessToken
      })
    })
    .catch(err => {
      console.log(err);
    })
    // 받아온 authorization code로 다시 OAuth App에 요청해서 access token을 받을 수 있습니다.
    // access token은 보안 유지가 필요하기 때문에 클라이언트에서 직접 OAuth App에 요청을 하는 방법은 보안에 취약할 수 있습니다.
    // authorization code를 서버로 보내주고 서버에서 access token 요청을 하는 것이 적절합니다.

    // TODO: 서버의 /callback 엔드포인트로 authorization code를 보내주고 access token을 받아옵니다.
    // access token을 받아온 후
    //  - 로그인 상태를 true로 변경하고,
    //  - state에 access token을 저장하세요
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      // authorization server로부터 클라이언트로 리디렉션된 경우, authorization code가 함께 전달됩니다.
      // ex) http://localhost:3000/?code=5e52fb85d6a1ed46a51f
      this.getAccessToken(authorizationCode)
    }
  }

  render() {
    const { isLogin, accessToken } = this.state;
    return (
      <Router>
        <div className='App'>
          {isLogin ? (
            <Mypage accessToken={accessToken} />
          ) : (
              <Login />
            )}
        </div>
      </Router>
    );
  }
}

export default App;
