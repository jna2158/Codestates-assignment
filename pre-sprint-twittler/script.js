const writeUserName = document.querySelector('.writeUserName');
const submit = document.querySelector('.submit');
const writeMessage = document.querySelector('.writeMessage');
const refresh = document.querySelector('.refresh');
const commentList = document.querySelector('#commentList');
const commentSection = document.querySelector('#comment-section');
let id;

let user = [];
let message = [];
let created_at= [];

remainTweet(DATA);

const submittweet = function() {
    let newData = {};

    if(writeUserName.value.replace(" ","").length !== 0 && writeMessage.value.replace(" ","").length !== 0 ) {
        newData.user = writeUserName.value;
        newData.message = writeMessage.value;
        newData.created_at = new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초");
        DATA.push(newData);
        addTweet();
    }

    writeUserName.value = '';
    writeMessage.value = '';
}

function remainTweet(DATA) {
    for ( let i = 0; i < DATA.length; i++ ) {
        
      const commentList = document.querySelector('#commentList');
      const commentBox = document.createElement('li');
      commentBox.classList.add('comment');
      commentList.append(commentBox);
      const name = document.createElement('a');
      name.classList.add('ID');
      name.textContent = DATA[i]['user'];
      const date = document.createElement('span');
      date.classList.add('date');
      date.textContent = DATA[i]['created_at'];
      const tweet = document.createElement('div');
      tweet.classList.add = ('tweet');
      commentBox.append(name, date, tweet);
      tweet.textContent = DATA[i]['message'];
      id = document.querySelectorAll('.ID');
      idOnClick();
    }
}
  const refreshTweet = function() {
    if(refresh.textContent === 'check new tweets') {
        DATA.push(generateNewTweet());
        addTweet();
    }   
    else {
        revive();
        remainTweet(DATA);
        refresh.textContent = "check new tweets"
    }
  }
  
  function addTweet() {
    const commentList = document.querySelector('#commentList');
    const commentBox = document.createElement('li');
    commentBox.classList.add('comment');
    commentList.prepend(commentBox);
    const name = document.createElement('a');
    name.classList.add('ID');
    commentBox.append(name);
    name.textContent = DATA[DATA.length-1]['user'];
    const date = document.createElement('span');
    date.classList.add('date');
    commentBox.append(date);
    date.textContent = DATA[DATA.length-1]['created_at'];
    const tweet = document.createElement('div');
    tweet.classList.add = ('tweet');
    commentBox.append(tweet);
    tweet.textContent = DATA[DATA.length-1]['message'];
    id = document.querySelectorAll('.ID');
    idOnClick();
}

function filteredTweet (event) {
    refresh.textContent = 'return';
    let filteredDATA = DATA.filter(function(el) {        
        return el['user'] === event.target.textContent;
    })
    revive();
    remainTweet(filteredDATA);
}

function revive() {
    const commentList = document.querySelector('#commentList');
    commentList.remove();
    const commentLists = document.createElement('div');
    commentLists.setAttribute('id','commentList');
    commentSection.append(commentLists);
}

submit.onclick = submittweet;
refresh.onclick = refreshTweet;

function idOnClick() {
    for(let i = 0; i < id.length; i++) {
        id[i].onclick = filteredTweet;
    }
}