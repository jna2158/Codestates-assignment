import React from 'react';
import VideoList from '../VideoList';
import VideoListEntry from '../VideoListEntry';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fakeData } from './fakeData';
configure({ adapter: new Adapter() });

describe('VideoList', () => {
  test('함수 컴포넌트로 작성되어야 합니다', () => {
    expect(React.Component.isPrototypeOf(VideoList)).toBeFalsy();
  });

  test('하나의 비디오가 주어졌을 때, 하나의 `VideoListEntry` 컴포넌트가 표시되어야 합니다', () => {
    const wrap = shallow(
      <VideoList videos={fakeData.slice(-1)} />
    );
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.props().children.length).toBe(1);
    expect(wrap.children().everyWhere(child => child.name() === 'VideoListEntry')).toBeTruthy();
  });

  test('세개의 비디오가 주어졌을 때, 세개의 `VideoListEntry` 컴포넌트가 표시되어야 합니다', function () {
    const wrap = shallow(
      <VideoList videos={fakeData.slice(-3)} />
    );
    expect(wrap.exists()).toBeTruthy();
    expect(wrap.props().children.length).toBe(3);
    expect(wrap.children().everyWhere(child => child.name() === 'VideoListEntry')).toBeTruthy();
  });

})