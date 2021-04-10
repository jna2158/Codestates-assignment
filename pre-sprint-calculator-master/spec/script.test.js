if (typeof window === 'undefined') {
  // for node env
  const fs = require('fs');
  const path = require('path');
  const cwd = process.cwd();
  const { JSDOM } = require('jsdom');
  const { expect } = require('chai');
  require('mocha');

  const myLibrary = fs.readFileSync(path.join(cwd, '/script.js'), {
    encoding: 'utf-8',
  });
  const html = fs.readFileSync(path.join(cwd, '/calculator.html'));

  let window;
  window = new JSDOM(html, { runScripts: 'dangerously' }).window;
  const script = window.document.createElement('script');
  script.textContent = myLibrary;

  window.document.body.appendChild(script);

  test(window, expect);
} else {
  // for browser env
  var expect = chai.expect;
  test(window, expect);
}

function test(window, expect) {
  describe('bare minimum test', function () {
    bare(window, expect);
  });
  // ! Intermediate test와 Advanced test를 위해서는 아래 주석을 해제하세요.
   describe('Intermediate test', function () {
     intermediate(window, expect);
   });
   describe('Advanced Challenge test', function () {
     advanced(window, expect);
   });
}

function bare(window, expect) {
  describe('유어클레스 bare minimum 레슨의 예를 통과합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

    it('처음 숫자 버튼을 눌렀을 때, 첫 번째 화면에 누른 숫자가 보여야 합니다.', function (done) {
      const test = ['7', '7'];
      const clicks = test.slice(0, -1);
      const expected = test.slice(-1)[0];
      const firstOperend = window.document.querySelector('.calculator__operend--left');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.equal(expected);
      done();
    });

    it('숫자 버튼과 연산자 버튼을 눌렀을 때, 첫 번째 화면는 숫자, 두 번째 화면에는 연산자가 보여야 합니다.', function (done) {
      const clicks = ['7', '+'];
      const expected = ['7', '+'];
      const firstOperend = window.document.querySelector('.calculator__operend--left');
      const operator = window.document.querySelector('.calculator__operator');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      done();
    });

    it('숫자 버튼, 연산자 버튼, 숫자 버튼을 눌렀을 때, 화면에 숫자, 연산자, 순자의 순서로 보여야 합니다.', function (done) {
      const clicks = ['7', '+', '5'];
      const expected = ['7', '+', '5'];
      const firstOperend = window.document.querySelector('.calculator__operend--left');
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector('.calculator__operend--right');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      done();
    });

    it('숫자 버튼, 연산자 버튼, 숫자 버튼, 엔터 버튼을 눌렀을 때, 화면에 숫자, 연산자, 숫자, =, 연산 결과의 순서로 보여야 합니다.', function (done) {
      const clicks = ['7', '+', '5', 'Enter'];
      const expected = ['7', '+', '5', '12'];
      const firstOperend = window.document.querySelector('.calculator__operend--left');
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector('.calculator__operend--right');
      const calculatedResult = window.document.querySelector('.calculator__result');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      expect(calculatedResult.textContent).to.be.equal(expected[3]);
      done();
    });

    it('연산 시 script.js의 calculate 함수를 활용해야 합니다.', function (done) {
      const clicks = ['7', '+', '5', 'Enter'];
      const expected = ['7', '+', '5', '12'];
      const firstOperend = window.document.querySelector('.calculator__operend--left');
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector('.calculator__operend--right');
      const calculatedResult = window.document.querySelector('.calculator__result');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });

      const firstNum = firstOperend.textContent;
      const operatorContent = operator.textContent;
      const secondNum = secondOperend.textContent;

      const stringInputResult = window.calculate(firstNum, operatorContent, secondNum);
      const numberInputResult = window.calculate(Number(firstNum), operatorContent, Number(secondNum));
      const isPassed = Boolean(stringInputResult === expected[3]) || Boolean(numberInputResult === expected[3]);

      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      expect(calculatedResult.textContent).to.be.equal(expected[3]);
      expect(isPassed).to.be.true;
      done();
    });

    it('clear 버튼을 눌렀을 때, 화면에 0, +, 0, =, 0 순서로 보여야 합니다.', function (done) {
      const clicks = ['7', '+', '5', 'Enter'];
      const expected = ['7', '+', '5', '12'];
      const firstOperend = window.document.querySelector('.calculator__operend--left');
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector('.calculator__operend--right');
      const calculatedResult = window.document.querySelector('.calculator__result');

      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });

      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      expect(calculatedResult.textContent).to.be.equal(expected[3]);

      const clearButton = window.document.querySelector('.clear');
      clearButton.dispatchEvent(clickEvent);

      expect(firstOperend.textContent).to.be.equal('0');
      expect(operator.textContent).to.be.equal('+');
      expect(secondOperend.textContent).to.be.equal('0');
      expect(calculatedResult.textContent).to.be.equal('0');

      done();
    });
  });
}

function intermediate(window, expect) {
  describe('유어클레스 intermediate 레슨의 예를 통과합니다.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

    describe('Step 1 - 숫자 버튼을 누르고 화면에 숫자를 입력하기', function () {
      it('숫자 버튼을 눌렀을 때, 계산기 화면에 숫자가 보여야 합니다.', function (done) {
        const test = ['7', '7'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector('.calculator__display--intermediate');
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });

      it('숫자 버튼을 여러 번 눌렀을 때, 계산기 화면에 숫자가 이어붙여져야(concatenation) 합니다.', function (done) {
        const test = ['7', '0', '0', '0', '7000'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector('.calculator__display--intermediate');
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });
    });

    describe('Step 2 - Enter 버튼을 눌러 계산하고, AC 버튼으로 초기화 시키기', function () {
      it('연산자 버튼을 눌렀을 때, 계산기 화면에 보이는 숫자를 따로 저장하고 계산할 준비해야 합니다.', function (done) {
        const test = ['7', '0', '0', '0', '*', '7000'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector('.calculator__display--intermediate');
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });

      it('Enter 버튼을 눌렀을 때, 계산기 화면에 보이는 숫자와 따로 저장된 숫자를 함께 조합하여 계산한 결과를 화면에 보여줘야 합니다.', function (done) {
        const test = ['7', '0', '0', '0', '*', '6', 'Enter', '42000'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector('.calculator__display--intermediate');
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });

      describe('AC 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
        afterEach(function () {
          clearButton.dispatchEvent(clickEvent);
        });

        it(`AC가 표시된 버튼을 클릭하면 초기화가 되어야 합니다.`, function (done) {
          const display = window.document.querySelector('.calculator__display--intermediate');
          display.textContent = 'Something strange';
          const clearButton = window.document.querySelector('.clear');
          clearButton.dispatchEvent(clickEvent);

          expect(display.textContent).to.equal('0');
          done();
        });
      });
    });
  });

  describe('calculate 함수를 검사합니다.', function () {
    describe('정수의 연산을 테스트 합니다.', function () {
      const calculateFuncTest = function (testValue) {
        const { firstNum, operator, displayedNum, result } = testValue;

        it(`${firstNum}과 ${displayedNum}의 합은 ${result}이여야 합니다.`, function (done) {
          const stringInputResult = window.calculate(firstNum, operator, displayedNum);
          const numberInputResult = window.calculate(Number(firstNum), operator, Number(displayedNum));
          const isPassed = Boolean(stringInputResult === result) || Boolean(numberInputResult === result);
          expect(isPassed).to.be.true;
          done();
        });
      };

      describe('덧샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '1', operator: '+', displayedNum: '2', result: '3' },
          { firstNum: '9492', operator: '+', displayedNum: '848946', result: '858438' },
          { firstNum: '1028', operator: '+', displayedNum: '1231', result: '2259' },
          { firstNum: '100', operator: '+', displayedNum: '1100', result: '1200' },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('뺄샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '1', operator: '-', displayedNum: '2', result: '-1' },
          { firstNum: '9492', operator: '-', displayedNum: '9492', result: '0' },
          { firstNum: '1111', operator: '-', displayedNum: '1100', result: '11' },
          { firstNum: '1100', operator: '-', displayedNum: '1000', result: '100' },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('곱샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '1', operator: '*', displayedNum: '2', result: '2' },
          { firstNum: '9492', operator: '*', displayedNum: '231', result: '2192652' },
          { firstNum: '100', operator: '*', displayedNum: '100', result: '10000' },
          { firstNum: '100', operator: '*', displayedNum: '1', result: '100' },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('나눗샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '4', operator: '/', displayedNum: '2', result: '2' },
          { firstNum: '100', operator: '/', displayedNum: '10', result: '10' },
          { firstNum: '2048', operator: '/', displayedNum: '1024', result: '2' },
          { firstNum: '28972456', operator: '/', displayedNum: '2323', result: '12472' },
        ];
        testArr.forEach(calculateFuncTest);
      });
    });
  });

  describe('계산기의 작동을 테스트 합니다.', function () {
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    describe('숫자 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
      numbers.forEach(function (number) {
        it(`숫자 버튼을 클릭하면 화면에 숫자가 표시되어야 합니다.`, function (done) {
          const button = getButtonBy(number, numberButtons);
          const display = window.document.querySelector('.calculator__display--intermediate');
          display.textContent = '0';
          button.dispatchEvent(clickEvent);

          expect(display.textContent).to.equal(number);
          done();
        });
      });
    });

    describe('AC 버튼이 잘 클릭 되는지 테스트 합니다.', function () {
      it(`AC가 표시된 버튼을 클릭하면 초기화가 되어야 합니다.`, function (done) {
        const display = window.document.querySelector('.calculator__display--intermediate');
        display.textContent = 'Something strange';
        const clearButton = window.document.querySelector('.clear');
        clearButton.dispatchEvent(clickEvent);

        expect(display.textContent).to.equal('0');
        done();
      });
    });

    describe('기본적인 계산기의 기능을 검사합니다.', function () {
      const bareRequirementTests = [
        ['1', '1', '+', '1', 'Enter', '12'],
        ['1', '1', '-', '1', 'Enter', '10'],
        ['1', '5', '*', '4', 'Enter', '60'],
        ['9', '0', '/', '3', 'Enter', '30'],
        ['0', '+', '0', 'Enter', '0'],
      ];

      bareRequirementTests.forEach(function (test) {
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        it(`${clicks}를 연속으로 누르면 ${expected}이(가) 화면에 표시되어야 합니다.`, function (done) {
          const display = window.document.querySelector('.calculator__display--intermediate');
          clicks.forEach(function (click) {
            const button = getButtonBy(click, allButtons);
            button.dispatchEvent(clickEvent);
          });
          expect(display.textContent).to.equal(expected);
          done();
        });
      });
    });
  });
}

function advanced(window, expect) {
  describe('calculate 함수를 검사합니다.', function () {
    describe('실수 연산을 테스트 합니다.', function () {
      const calculateFuncTest = function (testValue) {
        const { firstNum, operator, displayedNum, result } = testValue;

        it(`${firstNum}과 ${displayedNum}의 합은 ${result}이여야 합니다.`, function (done) {
          const stringInputResult = window.calculate(firstNum, operator, displayedNum);
          const numberInputResult = window.calculate(Number(firstNum), operator, Number(displayedNum));
          const isPassed = Boolean(stringInputResult === result) || Boolean(numberInputResult === result);
          expect(isPassed).to.be.true;
          done();
        });
      };

      describe('덧샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '0.2341324', operator: '+', displayedNum: '0.91723', result: '1.1513624' },
          { firstNum: '0.1', operator: '+', displayedNum: '0.2', result: '0.30000000000000004' },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('뺄샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '3.3', operator: '-', displayedNum: '3', result: '0.2999999999999998' },
          { firstNum: '120984.1', operator: '-', displayedNum: '0.12', result: '120983.98000000001' },
        ];
        testArr.forEach(calculateFuncTest);
      });

      describe('곱샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '0.124', operator: '*', displayedNum: '12.1231', result: '1.5032644000000002' },
          { firstNum: '12.13', operator: '*', displayedNum: '123.42', result: '1497.0846000000001' },
        ];
        testArr.forEach(calculateFuncTest);
      });

      describe('나눗샘 연산을 검사합니다', function () {
        const testArr = [
          { firstNum: '1.5032644000000002', operator: '/', displayedNum: '0.124', result: '12.1231' },
          { firstNum: '1497.0846000000001', operator: '/', displayedNum: '12.13', result: '123.42' },
        ];
        testArr.forEach(calculateFuncTest);
      });
    });
  });

  describe('계산기의 작동을 테스트 합니다.', function () {
    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [clearButton, enterButton, decimalButton, ...numberButtons, ...operatorButtons];

    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    describe('혹시 발생할 수 있는 특이한 작동 시 기능을 검사합니다.', function () {
      const consecutiveEnterTests = [
        ['3', '*', '3', 'Enter', 'Enter', 'Enter', 'Enter', '243'],
        ['3', '-', '3', 'Enter', 'Enter', 'Enter', 'Enter', '-9'],
        ['3', '+', '3', 'Enter', 'Enter', 'Enter', 'Enter', '15'],
        ['3', '/', '3', 'Enter', 'Enter', 'Enter', 'Enter', '0.037037037037037035'],
        ['3', 'Enter', 'Enter', 'Enter', '*', '3', 'Enter', '9'],
        ['3', 'Enter', 'Enter', 'Enter', '-', '3', 'Enter', '0'],
        ['3', 'Enter', 'Enter', 'Enter', '+', '3', 'Enter', '6'],
        ['3', 'Enter', 'Enter', 'Enter', '/', '3', 'Enter', '1'],
      ];

      const consecutiveOperatorTests = [
        ['3', '*', '*', '*', '*', '3', 'Enter', '9'],
        ['3', '-', '-', '-', '-', '3', 'Enter', '0'],
        ['3', '+', '+', '+', '+', '3', 'Enter', '6'],
        ['3', '/', '/', '/', '/', '3', 'Enter', '1'],
        ['3', '+', '-', '*', '/', '3', 'Enter', '1'],
        ['3', '/', '+', '-', '*', '3', 'Enter', '9'],
        ['3', '/', '/', '+', '-', '3', 'Enter', '0'],
        ['3', '*', '/', '-', '+', '3', 'Enter', '6'],
        ['3', '*', '3', 'Enter', '*', '*', '*', '9'],
        ['3', '-', '3', 'Enter', '-', '-', '-', '0'],
      ];

      const noSecondOperandTests = [
        ['3', '*', 'Enter', '9'],
        ['3', '-', 'Enter', '0'],
        ['7', '4', '2', '+', 'Enter', '1484'],
        ['8', '9', '1', '2', '/', 'Enter', '1'],
      ];

      const consecutiveDecimalTests = [
        ['3', '.', '.', '.', '.', '.', '2', '+', '3', 'Enter', '6.2'],
        ['3', '.', '.', '.', '.', '.', '2', '-', '2', 'Enter', '1.2000000000000002'],
        ['3', '.', '2', '1', '2', '4', '+', '2', '.', '1', '1', '2', '3', 'Enter', '5.3247'],
        ['6', '2', '3', '.', '1', '2', '9', '3', '8', '/', '1', '2', '4', 'Enter', '5.02523693548387'],
        ['1', '2', '.', '.', '.', '1', '2', '3', '8', '*', '2', '3', 'Enter', '278.8474'],
      ];

      const operatorDecimalTests = [
        ['5', '1', '-', '.', '1', '2', 'Enter', '50.88'],
        ['1', '0', '0', '/', '.', '5', 'Enter', '200'],
        ['1', '0', '0', '+', '.', '.', '5', 'Enter', '100.5'],
        ['1', '0', '0', '*', '.', '.', '5', 'Enter', '50'],
      ];

      // eslint-disable-next-line prettier/prettier
      const complicateConsecutiveCalculationTests = [['1', '0', '0', '.', '.', '1', '2', '5', '2', '+', '1', '2', '+', '1', '5', '-', '-', '2', '3', '-', '1', '4', '4', '2', '/', '2', '3', '/', '/', '1', '2', '*', '2', '3', 'Enter', '-111.48956666666668']];

      const advancedTests = [
        ...consecutiveEnterTests,
        ...consecutiveOperatorTests,
        ...noSecondOperandTests,
        ...operatorDecimalTests,
        ...consecutiveDecimalTests,
        ...complicateConsecutiveCalculationTests,
      ];

      advancedTests.forEach(function (test) {
        const clicks = test.slice(0, -1);
        const displayedResult = test.slice(-1)[0];
        it(`${clicks}를 연속으로 누르면 ${displayedResult}이(가) 화면에 표시되어야 합니다.`, function (done) {
          const display = window.document.querySelector('.calculator__display--intermediate');
          clicks.forEach(function (click) {
            const button = getButtonBy(click, allButtons);
            button.dispatchEvent(clickEvent);
          });
          expect(display.textContent).to.equal(displayedResult);
          done();
        });
      });
    });
  });
}
