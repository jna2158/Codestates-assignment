// [엘리먼트 변수]
// 여기에 querySelector를 이용해 상호작용을 해야 하는 모든 엘리먼트를 전역변수로 지정하세요
const btnSignup = document.querySelector('#btn-signup')
const button = document.querySelector('#btn-signup')
const inputform = document.querySelector('label.input-form')
const inputbox = document.querySelector('input')
const elErrorMessage = document.querySelector('.errorMsg')

const PwdErrorMessage = document.querySelector('.PwdErrorMsg')
const passwordform = document.querySelector('.passwordform')
const passwordbox = document.querySelector('.password')

const confirmErrorMessage = document.querySelector('.ConfirmErrorMsg')
const confirmform = document.querySelector('.ConfirmPasswordForm')
const confirmbox = document.querySelector('.ConfirmPassword')

// [이벤트 핸들러]
function handleBtnSignupClick() {
  console.log('회원가입 버튼을 클릭했군요!')
}

function handleButtonClick() {
  console.log(inputbox.value)
  
  if(moreThanLength(inputbox.value,8)) {
    alert("아이디 입력 완료");
    displayValidMessage();
  }
  else if(!fillIn(inputbox.value)) {
    displayErrorMessage('아이디를 입력하세요.',1)
  }
  else{
    displayErrorMessage('아이디는 8자리 이상이어야합니다.')
  }

  if(strongPassword(passwordbox.value)) {
    alert('비밀번호 입력 완료');
    displayValidMessage();
  }
  else if(!fillIn(passwordbox.value)) {
    displayErrorMessage('비밀번호를 입력하세요.',2)
  }
  
  if(!checkPassword(passwordbox.value, confirmbox.value)) {
    displayErrorMessage('비밀번호가 서로 다릅니다.',3)
  }
}

  /*
  버튼을 클릭했을 때, 작동해야하는 시나리오의 예시를 소개합니다.
  예를 들어, 아이디가 8자 이상인지 확인하려면,

  1. 아이디 input box를 변수로 지정한다
  2. input box에 적힌 값을 얻어온다
  3. input 값을 함수를 이용해 검증한다
  4. 함수 리턴값 (true 또는 false)을 통해 유효성을 검증하여 로직을 분기한다
  5. 유효하다면, 정상적으로 로그인했다고 alert 창을 띄운다
  6. 유효하지 않다면
    6-1. 아이디 입력창 옆에 오류 메시지를 표시한다
    6-2. 아이디 입력창에 붉은색의 스타일을 적용한다
  */

// [유효성 검증 함수]
// 필요에 따라서 여러분들이 사용할 유효성 검증 함수를 추가하세요.
function moreThanLength(str, n) {
  return str.length >= n; // 항상 true 또는 false로 리턴하게 만드는 게 좋습니다.
}

function fillIn(str) {
  if(str.length !== 0)
    return true;
  return false;
}

function checkPassword(str1, str2) {
  if(str1 === str2)
    return true;
  return false;
}

function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// [시각적 피드백]
function displayErrorMessage(message,check) {
  if(check === 1) {
    elErrorMessage.classList.add('invalid');
    inputform.classList.add('invalid');
    elErrorMessage.textContent = message;
  }
  else if(check === 2) {
    PwdErrorMessage.classList.add('invalid')
    passwordform.classList.add('invalid');
    PwdErrorMessage.textContent = message;
  }
  else {
    confirmErrorMessage.classList.add('invalid')
    confirmform.classList.add('invalid')
    confirmErrorMessage.textContent = message
  }
}

function displayValidMessage() {
    elErrorMessage.classList.remove('invalid');
    inputform.classList.remove('invalid');
    elErrorMessage.classList.add('valid');
    inputform.classList.add('valid');
    elErrorMessage.textContent='';


    PwdErrorMessage.classList.remove('invalid');
    passwordform.classList.remove('invalid');
    PwdErrorMessage.classList.add('valid');
    passwordform.classList.add('valid');
    PwdErrorMessage.textContent='';

    confirmErrorMessage.classList.remove('invalid');
    confirmform.classList.remove('invalid');
    confirmErrorMessage.classList.add('valid');
    confirmform.classList.add('valid')
    confirmErrorMessage.textContent='';

}

// [엘리먼트와 이벤트 핸들러의 연결]
btnSignup.onclick = handleBtnSignupClick;
button.onclick = handleButtonClick;

