const calculator = document.querySelector('.calculator'); 
const buttons = calculator.querySelector('.calculator__buttons');
const display = document.querySelector('.calculator__display--intermediate');
let number, intermediateOperator

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

buttons.addEventListener('click', function (event) { //버튼을 눌렀을 때 작동되는 함수
  const target = event.target; 
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches('button')) {
    if (action === 'number') {
      if(display.textContent === '0') {
        display.textContent = buttonContent;
      }
      else if(intermediateOperator && display.textContent ===  number) {
        display.textContent = buttonContent;
      }
      else {
        display.textContent += buttonContent;
      }
    }
    if (action === 'operator') {
      number = display.textContent;
      intermediateOperator = buttonContent;
    }
    if (action === 'decimal') {
      display.textContent += '.';
    }
    if (action === 'clear') {
      display.textContent = '0';
      intermediateOperator = undefined;
      number = '';
    }
    if (action === 'calculate') {
      display.textContent = calculate(number,intermediateOperator,display.textContent);
    }
  }
});
