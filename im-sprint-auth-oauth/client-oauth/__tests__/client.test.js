import { expect } from "chai";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import App from "../src/App";
import Login from "../src/components/Login";
import Mypage from "../src/components/Mypage";
import nock from 'nock'

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><body><p>paragraph</p></body></html>`);

global.window = dom.window;
global.document = dom.window.document;
Enzyme.configure({ adapter: new Adapter() });

describe('Login.js', () => {
  it('GitHub 사용자 인증 링크로 이동해야 합니다', () => {
    const wrapper = shallow(<Login />);
    const url = new URL(wrapper.instance().GITHUB_LOGIN_URL)

    expect(url.origin).to.eql('https://github.com')
    expect(url.searchParams.get('client_id')).match(/[0-9a-f]{20}/g)
  })
})

describe("App.js", () => {
  it("access token이 상태로 존재해야 합니다", () => {
    const wrapper = shallow(<App />);
    const state = wrapper.state();
    expect(state).to.have.property('accessToken');
  });

  it("authorization code가 url parameter로 전달될 경우, access token을 서버에서 받아올 수 있어야 합니다", async () => {
    nock('http://localhost:8080')
      .post('/callback', { authorizationCode: 'fake_auth_code' })
      .reply(200, {
        accessToken: 'fake_access_token'
      })

    const wrapper = shallow(<App />);
    await wrapper.instance().getAccessToken('fake_auth_code')

    const state = wrapper.state()
    expect(state.accessToken).to.eql('fake_access_token')
  });
})

describe("Mypage.js", () => {
  it("access token을 이용해 GitHub API를 호출하여 사용자 정보를 받아올 수 있어야 합니다", (done) => {
    const fakeAccessToken = 'fakeAccessToken'
    const scope = nock('https://api.github.com', {
      reqheaders: { authorization: `token ${fakeAccessToken}` }
    })
      .get('/user')
      .reply(200)

    const wrapper = shallow(<Mypage accessToken='fakeAccessToken' />);
    wrapper.instance().getGitHubUserInfo()

    setTimeout(() => {
      const ajaxCallCount = scope.interceptors[0].interceptionCounter;
      expect(ajaxCallCount, '요구사항에 맞는 ajax 요청을 보내지 않았습니다.').to.eql(1);

      done()
    }, 300)
  });

  it("사용자 정보가 성공적으로 표시되어야 합니다", (done) => {
    const fakeAccessToken = 'fakeAccessToken'
    nock('https://api.github.com', {
      reqheaders: { authorization: `token ${fakeAccessToken}` }
    })
      .get('/user')
      .reply(200, {
        name: '김코딩',
        login: 'kimcoding',
        html_url: 'https://github.com/kimcoding',
        public_repos: 2
      })

    const wrapper = shallow(<Mypage accessToken='fakeAccessToken' />);
    wrapper.instance().getGitHubUserInfo()

    setTimeout(() => {
      expect(wrapper.find('#name').text()).to.eql('김코딩')
      expect(wrapper.find('#login').text()).to.eql('kimcoding')
      expect(wrapper.find('#html_url').text()).to.eql('https://github.com/kimcoding')
      expect(wrapper.find('#public_repos').text()).to.eql('2')

      done()
    }, 300)
  });

  it('인증된 사용자는 resources server로부터 이미지 접근이 가능합니다', (done) => {
    const fakeAccessToken = 'fakeAccessToken'
    nock('http://localhost:8080', {
      reqheaders: { authorization: `token ${fakeAccessToken}` }
    })
      .persist()
      .get('/images')
      .reply(200, {
        images: [
          { file: '1.png', blob: 'data:image/png;base64,iVBORw1111' },
          { file: '2.png', blob: 'data:image/png;base64,iVBORw2222' },
          { file: '3.png', blob: 'data:image/png;base64,iVBORw3333' }
        ]
      })

    const wrapper = shallow(<Mypage accessToken='fakeAccessToken' />);
    wrapper.instance().getImages()

    setTimeout(() => {
      expect(wrapper.find('#images').children().length).to.eql(3)

      expect(wrapper.find('#images').childAt(0).props().src).to.eql('data:image/png;base64,iVBORw1111')
      expect(wrapper.find('#images').childAt(1).props().src).to.eql('data:image/png;base64,iVBORw2222')
      expect(wrapper.find('#images').childAt(2).props().src).to.eql('data:image/png;base64,iVBORw3333')

      done()
    }, 300)
  })
})