/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import React from 'react';
import sinon from 'sinon';

import Login from '../src/components/Login';
import Mypage from '../src/components/Mypage';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(
  `<!doctype html><html><body><p>paragraph</p></body></html>`
);

global.window = dom.window;
global.document = dom.window.document;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
Enzyme.configure({ adapter: new Adapter() });

describe('Authentication - Client', () => {
  const mockUser = {
    username: 'kimcoding',
    password: '1234',
  };

  describe('Mypage Component', () => {
    it('props에 userData 객체가 존재해야 합니다', () => {
      const userData = { id: 0, userId: 'test', email: 'test@test.com' };
      const wrapper = mount(<Mypage userData={userData} />);

      expect(wrapper.find('.name').text()).to.eql('test');
    });

    it('로그아웃 버튼이 클릭된 경우, POST `/users/logout` 요청을 보내야합니다', function (done) {
      const scope = nock('https://localhost:4000')
        .post('/users/logout')
        .reply(200, { data: null, message: 'ok' });

      const wrapper = shallow(<Mypage userData={{}} />);

      wrapper.find('.logoutBtn').simulate('click');
      setTimeout(() => {
        scope.done();

        done();
      }, 500);
    });

    it('로그아웃 요청이 성공한 이후, logoutHandler 함수가 호출되어야 합니다.', function (done) {
      const scope = nock('https://localhost:4000')
        .post('/users/logout')
        .reply(200, { data: null, message: 'ok' });
      let obj = {};
      obj.logoutHandler = function () { };

      let spy = sinon.spy(obj, 'logoutHandler');

      const wrapper = shallow(
        <Mypage logoutHandler={obj.logoutHandler} userData={{}} />
      );

      wrapper.find('.logoutBtn').simulate('click');
      setTimeout(() => {
        expect(spy.callCount).to.eql(1);

        spy.restore();
        scope.done();
        done();
      }, 500);
    });
  });

  describe('Login Component', () => {
    it('로그인 버튼이 클릭된경우, POST `/login` 요청을 보내야 합니다', (done) => {
      let scope = nock('https://localhost:4000').post('/users/login').reply(
        200,
        { data: null, message: 'ok' },
        {
          'Set-Cookie': `connect.sid=fakeSessionId; path='/'; Secure; HttpOnly=true; SameSite=none;`,
        }
      );

      const wrapper = mount(<Login loginHandler={() => { }} />);

      wrapper.setState(mockUser);
      wrapper.find('.loginBtn').simulate('click');

      setTimeout(() => {
        scope.done();

        done();
      }, 500);
    });

    it('로그인에 성공한 경우, `loginHandler` 함수가 호출되어야 합니다', (done) => {
      nock('https://localhost:4000').post('/users/login').reply(
        200,
        { data: null, message: 'ok' },
        {
          'Set-Cookie': `connect.sid=fakeSessionId; path='/'; Secure; HttpOnly=true; SameSite=none;`,
        }
      );

      let obj = {};
      obj.loginHandler = function () { };

      let spy = sinon.spy(obj, 'loginHandler');

      const wrapper = mount(<Login loginHandler={obj.loginHandler} />);

      wrapper.setState(mockUser);
      wrapper.find('.loginBtn').simulate('click');

      setTimeout(() => {
        expect(spy.callCount).to.eql(1);

        done();
      }, 500);
    });

    it('로그인 이후 GET `/users/userinfo` 요청을 통해 유저정보를 받아와야 합니다', (done) => {
      nock('https://localhost:4000').post('/users/login').reply(
        200,
        { data: null, message: 'ok' },
        {
          'Set-Cookie': `connect.sid=fakeSessionId; path='/'; Secure; HttpOnly=true; SameSite=none;`,
        }
      );

      const mypageScope = nock('https://localhost:4000')
        .get('/users/userinfo')
        .reply(200, {
          data: {
            id: 2,
            userId: 'kimcoding',
            email: 'kimcoding@authstates.com',
          },
          message: 'ok',
        });

      let obj = {};
      obj.setUserInfo = function () { };
      obj.loginHandler = function () { };

      const wrapper = mount(
        <Login loginHandler={obj.loginHandler} setUserInfo={obj.setUserInfo} />
      );

      wrapper.setState(mockUser);
      wrapper.find('.loginBtn').simulate('click');

      setTimeout(() => {
        mypageScope.done();
        done();
      }, 500);
    });

    it('성공적으로 GET `/users/userinfo`요청이 완료된 이후, `setUserInfo` 함수가 실행되어야 합니다', (done) => {
      nock('https://localhost:4000').post('/users/login').reply(
        200,
        { data: null, message: 'ok' },
        {
          'Set-Cookie': `connect.sid=fakeSessionId; path='/'; Secure; HttpOnly=true; SameSite=none;`,
        }
      );

      nock('https://localhost:4000')
        .get('/users/userinfo')
        .reply(200, {
          data: {
            id: 2,
            userId: 'kimcoding',
            email: 'kimcoding@authstates.com',
          },
          message: 'ok',
        });

      let obj = {};
      obj.setUserInfo = function () { };
      obj.loginHandler = function () { };

      let spy = sinon.spy(obj, 'setUserInfo');

      const wrapper = mount(
        <Login loginHandler={obj.loginHandler} setUserInfo={obj.setUserInfo} />
      );

      wrapper.setState(mockUser);
      wrapper.find('.loginBtn').simulate('click');

      setTimeout(() => {
        expect(spy.callCount).to.eql(1);
        done();
      }, 500);
    });
  });
});