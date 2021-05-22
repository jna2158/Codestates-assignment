import React from 'react';
import Search from '../Search';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Search', () => {
  let wrap;
  let callCount = 0;
  let doSomething = () => { callCount++ }

  beforeEach(() => {
    callCount = 0;
    wrap = mount(
      <Search handleButtonClick={doSomething} />
    );
  })

  test('클래스 컴포넌트로 작성되어야 합니다', () => {
    expect(React.Component.isPrototypeOf(Search)).toBeTruthy();
  });

  test('input box에 입력하는 값을 다루기 위한 상태가 필요합니다 (키 이름은 queryString)', () => {
    expect(wrap.state('queryString')).toBeDefined();
  });

  test('input box의 입력값이 변경되면, 상태(queryString)가 변경되어야 합니다', () => {
    expect(wrap.prop('handleButtonClick')).toBeDefined();

    const inputbox = wrap.find('input.form-control').first();
    inputbox.simulate('change', { target: { value: '코드스테이츠' } });

    expect(wrap.state('queryString')).toBe('코드스테이츠');
  });

  test('button을 클릭하면, 부모 컴포넌트로부터 handleButtonClick props를 통해 전달받은 함수를 실행시켜야 합니다', () => {
    expect(wrap.prop('handleButtonClick')).toBeDefined();

    const button = wrap.find('button.btn').first();
    button.simulate('click');

    expect(callCount).toBe(1)
  });
});