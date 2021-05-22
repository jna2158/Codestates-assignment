import React from 'react';
import App from '../App';
import VideoList from '../VideoList';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fakeData } from './fakeData';
import VideoPlayer from '../VideoPlayer';
configure({ adapter: new Adapter() });

describe('App', () => {
  let wrap;

  beforeEach(() => {
    wrap = mount(
      <App />
    );
  })

  test('클래스 컴포넌트로 작성되어야 합니다', () => {
    expect(React.Component.isPrototypeOf(App)).toBeTruthy();
  });

  test('하나의 VideoPlayer 컴포넌트를 포함합니다', () => {
    wrap.setState({ isLoading: false });

    expect(wrap.find(VideoPlayer).length).toBe(1);
  });

  test('하나의 VideoList 컴포넌트를 포함합니다', () => {
    wrap.setState({ isLoading: false });

    expect(wrap.find(VideoList).length).toBe(1);
  });

  test('VideoListEntry의 제목을 클릭하면, VideoPlayer의 비디오가 갱신되어야 합니다', () => {
    wrap.setState({
      videos: fakeData,
      currentVideo: null,
      isLoading: false
    }); // it works synchronously!

    const entryTitle = wrap.find('.video-list-entry-title').first();
    entryTitle.simulate('click');

    const playerTitle = wrap.find('.video-player-details h3');
    expect(playerTitle.text()).toBe(entryTitle.text());

    const entryTitle2 = wrap.find('.video-list-entry-title').last();
    entryTitle2.simulate('click');

    const playerTitle2 = wrap.find('.video-player-details h3');
    expect(playerTitle2.text()).toBe(entryTitle2.text());
  });
});