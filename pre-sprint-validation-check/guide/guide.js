// [엘리먼트 변수]
const elErrorMessage = document.querySelector('#invalid-message');

// [유효성 검증 함수]: n개의 글자 이상
function moreThanLength(str, n) {
  return str.length >= n;
}

// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
}

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}

// [시각적 피드백]: 에러메시지를 띄웁니다
function displayErrorMessage(message) {
  elErrorMessage.classList.add('show');
  elErrorMessage.textContent = message;
}

// [테스트]
console.log('`codestates`는 6글자 이상이므로', moreThanLength('codestates', 6))
console.log('`codestates`는 11글자 이하이므로', moreThanLength('codestates', 11))
console.log('`codestates`는 영어만 포함하므로', onlyNumberAndEnglish('codestates'))
console.log('`김coding`은 영어 외의 다른 글자도 포함하므로', onlyNumberAndEnglish('김coding'))
console.log('`김코딩`은 영어 외의 다른 글자도 포함하므로', onlyNumberAndEnglish('김코딩'))
console.log('`qwerty`는 충분히 강력하지 않은 암호이므로', strongPassword('qwerty'))
console.log('`q1w2e3r4`는 특수문자를 포함하지 않으므로', strongPassword('q1w2e3r4'))
console.log('`q1w2e3r4!`는 조건을 충족하므로', strongPassword('q1w2e3r4!'))

displayErrorMessage('insufficient requirements to register')