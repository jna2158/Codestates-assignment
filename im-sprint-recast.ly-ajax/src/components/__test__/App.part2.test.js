import React from 'react';
import App from '../App';
import Nav from '../Nav';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('App: Part 2', () => {
  jest.useFakeTimers('modern')
  let wrap;

  beforeEach(() => {
    global.ajaxCallCount = 0;
    wrap = mount(
      <App />
    );
  })

  test('비디오를 검색하는 함수(searchVideo)가 존재해야 합니다', () => {
    expect(wrap.instance().searchVideo).toBeDefined();
  })

  test('비디오 검색 후에는 비디오 목록이 최소한 한 개 이상이어야 합니다', () => {
    wrap.instance().searchVideo('코드스테이츠')

    jest.runAllTimers()
    wrap.update()

    expect(wrap.state('videos').length).not.toBe(0)
  });

  test('Nav 컴포넌트에 searchVideo 메소드를 props로 전달해줘야 합니다', () => {
    expect(wrap.find(Nav).prop('handleButtonClick').name).toBe('bound searchVideo');
  })

  test('searchVideo에서 setTimeout 대신 AJAX 요청을 해야 합니다 (그 후 응답을 이용해 비디오 목록을 업데이트하세요)', () => {
    wrap.instance().searchVideo('코드스테이츠')

    jest.runAllTimers()
    wrap.update()

    expect(global.ajaxCallCount).toBe(1)
  })

});