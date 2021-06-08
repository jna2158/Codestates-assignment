/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import nock from "nock";
import React from "react";

import App from "../src/App";
import Login from "../src/components/Login";
import Mypage from "../src/components/Mypage";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!doctype html><html><body><p>paragraph</p></body></html>`);

global.window = dom.window;
global.document = dom.window.document;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
Enzyme.configure({ adapter: new Adapter() });

describe("Authentication - Client", () => {
  const mockUser = {
    userId: "kimcoding",
    password: "1234",
  };

  describe("Login Component", () => {
    it("state에 유저아이디와 패스워드를 저장해야 합니다", (done) => {
      const wrapper = mount(<Login />);
      const state = wrapper.state();
      expect(state.userId).to.exist;
      expect(state.password).to.exist;
      done();
    });

    it('JWT 로그인 버튼을 누른다면  "https://localhost:4000/login" 주소로  POST 요청을 보내야 합니다', (done) => {
      const scope = nock("https://localhost:4000")
        .post("/login")
        .reply(200, { data: { accessToken: "fakeAccessToken" } });
      const wrapper = mount(<App />);
      const loginInWrapper = wrapper.children().childAt(0);
      loginInWrapper.setState(mockUser);
      wrapper.find(".loginBtn").simulate("click");

      setTimeout(() => {
        const ajaxCallCount = scope.interceptors[0].interceptionCounter;
        expect(ajaxCallCount).to.eql(1); // ajax call이 1회 발생
        expect(scope.interceptors[0].statusCode).to.eql(200);

        scope.done();
        done();
      });
    });

    it("POST /login 요청에는 유저아이디와 패스워드정보가 포함되어야 합니다", (done) => {
      const scope = nock("https://localhost:4000")
        .post("/login", mockUser)
        .reply(200, { data: { accessToken: "fakeAccessToken" } });
      const wrapper = mount(<App />);
      const loginInWrapper = wrapper.children().childAt(0);
      loginInWrapper.setState(mockUser);
      wrapper.find(".loginBtn").simulate("click");

      setTimeout(() => {
        const ajaxCallCount = scope.interceptors[0].interceptionCounter;
        expect(ajaxCallCount).to.eql(1); // ajax call이 1회 발생
        expect(scope.interceptors[0].statusCode).to.eql(200);

        scope.done();
        done();
      });
    });

    it("로그인에 성공한다면 App에 존재하는 isLogin, accessToken 의 상태를 변경해야 합니다", (done) => {
      const scope = nock("https://localhost:4000")
        .post("/login", mockUser)
        .reply(200, { data: { accessToken: "fakeAccessToken" } });
      const wrapper = mount(<App />);
      const loginInWrapper = wrapper.children().childAt(0);
      loginInWrapper.setState(mockUser);
      wrapper.find(".loginBtn").simulate("click");

      setTimeout(() => {
        expect(wrapper.state().isLogin).to.eql(true);
        expect(wrapper.state().accessToken).to.not.eql("");
        scope.done();
        done();
      }, 500);
    });
  });

  describe("Mypage Component", () => {
    it("상태에는 userId, email, and createdAt 정보가 포함되어야 합니다", (done) => {
      const wrapper = mount(<Mypage />);
      const state = wrapper.state();
      expect(state.userId).to.exist;
      expect(state.email).to.exist;
      expect(state.createdAt).to.exist;
      done();
    });

    it("App 컴포넌트에서 accessToken 정보를 props로 받아야 합니다", (done) => {
      const wrapper = mount(<App />);
      wrapper.setState({ isLogin: true });
      wrapper.update();
      const mypageWrapper = wrapper.children().childAt(0);
      expect(mypageWrapper.props().accessToken).to.exist;
      done();
    });

    it('access token request 버튼이 클릭된다면 "https://localhost:4000/accesstokenrequest"주소로 GET 요청을 보내야 합니다', (done) => {
      const scope = nock("https://localhost:4000").get("/accesstokenrequest").reply(200);
      const wrapper = mount(<Mypage />);
      wrapper.find(".btnContainer").children().at(0).simulate("click");

      setTimeout(() => {
        const ajaxCallCount = scope.interceptors[0].interceptionCounter;
        expect(ajaxCallCount).to.eql(1); // ajax call이 1회 발생
        expect(scope.interceptors[0].statusCode).to.eql(200);

        scope.done();
        done();
      });
    });

    it('GET "https://localhost:4000/accesstokenrequest" 요청은 헤더 Authorization 부분에 "Bearer YOUR_RECEIVED_ACCESS_TOKEN" 데이터가 포함되어야 합니다', (done) => {
      const scope = nock("https://localhost:4000", {
        reqheaders: { authorization: "Bearer fakeAccessToken" },
      })
        .get("/accesstokenrequest")
        .reply(200);

      const wrapper = mount(<Mypage accessToken='fakeAccessToken' />);
      wrapper.find(".btnContainer").children().at(0).simulate("click");

      setTimeout(() => {
        const ajaxCallCount = scope.interceptors[0].interceptionCounter;
        expect(ajaxCallCount).to.eql(1); // ajax call이 1회 발생
        expect(scope.interceptors[0].statusCode).to.eql(200);

        scope.done();
        done();
      });
    });

    it(' GET  "https://localhost:4000/accesstokenrequest" 요청이 성공한 경우, Mypage 페이지의 userId, email, and createdAt 상태를 변경해야 합니다', (done) => {
      const scope = nock("https://localhost:4000")
        .get("/accesstokenrequest")
        .reply(200, {
          data: { userInfo: { createdAt: "2020", userId: "1", email: "2" } },
          message: "ok",
        });

      const wrapper = mount(<Mypage />);
      wrapper.find(".btnContainer").children().at(0).simulate("click");

      setTimeout(() => {
        expect(wrapper.state().createdAt).to.eql("2020");
        expect(wrapper.state().userId).to.eql("1");
        expect(wrapper.state().email).to.eql("2");

        scope.done();
        done();
      }, 500);
    });

    it('token request button이 클릭된경우, GET "https://localhost:4000/refreshtokenrequest" 요청을 보내야 합니다', (done) => {
      const scope = nock("https://localhost:4000").get("/refreshtokenrequest").reply(200);
      const wrapper = mount(<Mypage />);
      wrapper.find(".btnContainer").children().at(1).simulate("click");

      setTimeout(() => {
        const ajaxCallCount = scope.interceptors[0].interceptionCounter;
        expect(ajaxCallCount).to.eql(1); // ajax call이 1회 발생
        expect(scope.interceptors[0].statusCode).to.eql(200);

        scope.done();
        done();
      });
    });

    it('GET "https://localhost:4000/refreshtokenrequest" 요청이 성공한 경우, Mypage 페이지의 userId, email, and createdAt 상태를 변경해야 합니다', (done) => {
      const scope = nock("https://localhost:4000")
        .get("/refreshtokenrequest")
        .reply(200, {
          data: { userInfo: { createdAt: "2020", userId: "1", email: "2" } },
          message: "ok",
        });

      const wrapper = mount(<Mypage />);
      wrapper.find(".btnContainer").children().at(1).simulate("click");

      setTimeout(() => {
        expect(wrapper.state().createdAt).to.eql("2020");
        expect(wrapper.state().userId).to.eql("1");
        expect(wrapper.state().email).to.eql("2");

        scope.done();
        done();
      }, 500);
    });

    it('GET "https://localhost:4000/refreshtokenrequest" 요청이 성공한 경우, App 컴포넌트의 accessToken 상태를 변경해야 합니다', (done) => {
      const scope = nock("https://localhost:4000")
        .get("/refreshtokenrequest")
        .reply(200, {
          data: {
            userInfo: { createdAt: "2020", userId: "1", email: "2" },
            accessToken: "new access token",
          },
          message: "ok",
        });

      const wrapper = mount(<App />);
      wrapper.setState({ isLogin: true });
      wrapper.update();
      const mypageWrapper = wrapper.children().childAt(0);
      mypageWrapper.find(".btnContainer").children().at(1).simulate("click");

      setTimeout(() => {
        expect(wrapper.state().accessToken).to.eql("new access token");

        scope.done();
        done();
      }, 500);
    });
  });
});
