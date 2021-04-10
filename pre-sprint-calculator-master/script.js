const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  let num1 = Number(n1);
  let num2 = Number(n2);

  if(operator === '+')
    result = num1 + num2;
  else if(operator === '-')
    result = num1 - num2;
  else if(operator === '*')
    result = num1 * num2;
  else if(operator === '/')
    result = num1 / num2;
  
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.

      if(firstOperend.textContent !== '0') {
        secondOperend.textContent = buttonContent;
        //console.log('두번째 숫자'　+ buttonContent + '버튼');
      }
      else {
        firstOperend.textContent = buttonContent;
        //console.log('첫번째 숫자 ' + buttonContent + '버튼');
      }     
    }

    if (action === 'operator') {
      operator.textContent = buttonContent;
      console.log('연산자 ' + buttonContent + ' 버튼');
    }

    if (action === 'decimal') {
       //console.log('소수점 버튼');
    }

    if (action === 'clear') {
      firstOperend.textContent = '0';
      secondOperend.textContent = '0';
      operator.textContent = '+';
      calculatedResult.textContent = '0';
    }

    if (action === 'calculate') {
      let result = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
      //let result = 12
      calculatedResult.textContent = result;
      console.log('계산 버튼');
    }
  }
});


 //! intermediate, advanced test를 위한 코드입니다. 도전하신다면 주석을 해제하세요.
 const display = document.querySelector('.calculator__display--intermediate'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
 //display -> 계산기 화면에 보이는 값을 확인할 수 있음
 let firstNum, intermediateOperator, previousKey, previousNum;
 buttons.addEventListener('click', function (event) {
   // 버튼을 눌렀을 때 작동하는 함수입니다.

   const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
   const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
   const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
   // ! 위 코드는 수정하지 마세요.

   // ! 여기서부터 intermetiate & advanced 과제룰 풀어주세요.
   if (target.matches('button')) {
     
     if (action === 'number') {
       if(display.textContent ==='0' || intermediateOperator) { //첫번째　숫자를　입력했을　때
        display.textContent = buttonContent;
       }
       else {
        display.textContent += buttonContent;
       }
     }

     if (action === 'operator') {
       firstNum = display.textContent;
       intermediateOperator = buttonContent;　//클릭한　연산자를　intermediateOperator에　저장
      }
     if (action === 'decimal') {
       display.textContent += '.';
       console.log('소수점 버튼');
     }
     if (action === 'clear') {
       display.textContent = '0';
       intermediateOperator = undefined;
       firstNum = '';
     }
     if (action === 'calculate') {
       display.textContent = calculate(firstNum,intermediateOperator,display.textContent);
     }
   }
 });
