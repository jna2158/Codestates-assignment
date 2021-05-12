const githubID = 'jiweon21' // 여러분의 아이디로 바꿔주세요 : 네
const app = {
  server: `http://3.36.72.17:3000/${githubID}/messages`,
  init: () => {
    app.fetch().then(data => { //fetch()로 가져온 데이터를 반복문을 이용해서 하나씩 renderMessage라는 함수에 보낸다.
      data.forEach(app.renderMessage);
    })
  },
  fetch: (data) => { //서버에서 데이터를 가져오는 역할을 한다.
    return window.fetch(app.server)
    .then(res => res.json())
    .then(data) //init()의 app.fetch()에서 재정의 하고 싶어서 만들었다. / fetch에서 쓴 데이터를 어떻게 리턴할까??..  데이터를 받아오게 되는 then 마지막 부분을 인자를 빼버리자 //마지막 인자만 콜백함수로 넣어주면 어디서든 쓸 수 있게 한다.
  },
  send: (message) => { //데이터를 서버로 보내는 역할을 한다.
    return window.fetch(app.server, {
      method: 'POST',
      body: JSON.stringify(message), //아까와 달리 res 라는 인자가 없기 때문에 . pasre는 문자열-> json stringify는 JS 객체 => json 우리는 지금 객체를 넣어줄거니까 stringify를 쓸거다.
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())

  },
  clearMessages: () => { //메시지를 삭제하고 다시 출력한다.
    document.querySelector("#chats").innerHTML=""; 
  },
  clearForm: () => {
    document.querySelector('.inputUser').value = '';
    document.querySelector('.inputChat').value = '';
  },
  renderMessage: (message) => { //메시지를 화면에 출력하는 역할을 한다.
    const chatsbox = document.querySelector('#chats');
    const ulbox = document.createElement("ul");
    const idbox = document.createElement('div');
    const messagebox = document.createElement('div');

    idbox.innerHTML = message.username;
    messagebox.innerHTML = message.text;

    ulbox.setAttribute('id', 'chatsList');
    idbox.setAttribute('id', 'user');
    messagebox.setAttribute('id', 'message');

    ulbox.append(idbox, messagebox);
    chatsbox.append(ulbox);
  },
  writeMessage: () => { //메시지를 작성하는 역할을 한다.
    const inputUser = document.querySelector('.inputUser');
    const inputChat = document.querySelector('.inputChat');
    const roombox = document.querySelector('#roomName');
    const userText = inputUser.value;
    const chatText = inputChat.value;
    const roomText = roombox.options[roombox.selectedIndex].text;
    const date = new Date();
    let message = {
      username: userText + ":",
      text: chatText,
      date: String(date),
      roomname: roomText
    };
    app.send(message);
  },
  changeRoom: () => { //방을 변경했을 때 메시지를 필터링한다.
    const roombox = document.querySelector('#roomName');
    const roomText = roombox.options[roombox.selectedIndex].text;
    
    if(roomText === 'allchats') {
      app.init();
    }
    else{
      return window.fetch(`http://3.36.72.17:3000/${githubID}/messages?roomname=${roomText}`)
      .then(res => res.json())
      .then(json => {
        app.clearForm();
        app.clearMessages();
        for(let message of json.results) {
          app.renderMessage(message);
        }
      })
    }
  },
  clearAllMessage: () => { //모든 메시지를 삭제한다.
    return window.fetch(`http://3.36.72.17:3000/${githubID}/clear`, {
      method: 'POST'
    })
  }
};

//post 버튼을 클릭했을 때 이벤트리스너 연결
const postButton = document.querySelector('.post');
postButton.onclick = app.writeMessage;

//방을 변경했을 때 이벤트리스너 연결
const roombox = document.querySelector('#roomName');
roombox.onchange = app.changeRoom;

//clear 버튼을 클릭했을 때 이벤트리스너 연결
const clearbutton = document.querySelector('.clear');
clearbutton.onclick = app.clearAllMessage;

app.init();

// 테스트를 위한 코드입니다. 아래 내용은 지우지 마세요
if(window.isNodeENV){
  module.exports = app;
}
