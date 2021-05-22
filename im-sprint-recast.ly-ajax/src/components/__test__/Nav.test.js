import React from 'react';
import Nav from '../Nav';
import Search from '../Search';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Nav', () => {
  let wrap
  let doSomething = () => { }

  beforeEach(() => {
    wrap = mount(<Nav handleButtonClick={doSomething} />);
  })

  test('부모 컴포넌트로부터 handleButtonClick props를 전달받습니다', () => {
    expect(wrap.prop('handleButtonClick')).toBeDefined();
  });

  test('Search 컴포넌트에 handleButtonClick props을 전달합니다', () => {
    const handlerFromParent = wrap.prop('handleButtonClick')
    expect(wrap.find(Search).prop('handleButtonClick')).toBe(handlerFromParent);
  });
});
