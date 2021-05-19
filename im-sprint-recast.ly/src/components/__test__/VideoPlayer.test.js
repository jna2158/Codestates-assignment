import React from 'react';
import VideoPlayer from '../VideoPlayer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fakeData } from './fakeData';
configure({ adapter: new Adapter() });

describe('VideoPlayer', () => {
  let commercialVideo, johnnyVideo, jsVideo;

  beforeEach(() => {
    commercialVideo = shallow(<VideoPlayer video={fakeData[0]} />);
    johnnyVideo = shallow(<VideoPlayer video={fakeData[1]} />);
    jsVideo = shallow(<VideoPlayer video={fakeData[2]} />);
  })

  test('함수 컴포넌트로 작성되어야 합니다', () => {
    expect(React.Component.isPrototypeOf(VideoPlayer)).toBeFalsy();
  });

  test('동적으로 비디오의 썸네일 이미지가 표시되어야 합니다', () => {
    const selector = '.embed-responsive-item';
    expect(commercialVideo.find(selector).props().src).toBe('https://www.youtube.com/embed/Mb-pqAnfaeI');
    expect(johnnyVideo.find(selector).props().src).toBe('https://www.youtube.com/embed/RRSYfDfujGk');
    expect(jsVideo.find(selector).props().src).toBe('https://www.youtube.com/embed/p5vI5OrLJU8');
  });

  test('동적으로 비디오의 제목이 표시되어야 합니다', () => {
    const selector = '.video-player-details h3';
    expect(commercialVideo.find(selector).text()).toBe('[코드스테이츠] 배움의 기회를 미루지 마세요');
    expect(johnnyVideo.find(selector).text()).toBe('개발과 코딩을 배우기 전, 알아야 할 5가지');
    expect(jsVideo.find(selector).text()).toBe('자바스크립트로 할 수 있는 7가지');
  });

  test('동적으로 비디오의 설명이 표시되어야 합니다', () => {
    const selector = '.video-player-details > div';
    expect(commercialVideo.find(selector).text()).toBe('코드스테이츠 엔지니어 박준홍님의 불꽃연기를 감상하세요');
    expect(johnnyVideo.find(selector).text()).toBe('코드스테이츠 CPO 구일모님의 이야기를 들어봅시다');
    expect(jsVideo.find(selector).text()).toBe('코드스테이츠 엔지니어 이호용님이 자바스크립트에 대해 소개합니다');
  });
});
