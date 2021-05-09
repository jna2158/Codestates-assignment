const http = require('http');
const PORT = 5000;
const ip = 'localhost';

const server = http.createServer((request, response) => {
  if(request.method === 'OPTIONS') { // 프리플라이트: 나 이거 보내도 안전해? 이거 보낸다 괜찮지?  Access-Control-Allow 조건에 부합하는지에 대한 판단은 브라우저에서 한다.
    response.writeHead(200, defaultCorsHeader); //헤더를 셋팅한다.
    response.end();
  }
  if(request.method === 'POST' && request.url === '/upper') {
    let body = [];
    request.on('error', err => { //요청에 에러가 있으면 on은 addEventListener와 비슷하다 
      console.log(err);
    })
    .on('data', (chunk) => { //요청에 데이터가 있으면  /* chunk: 데이터 조각조각 */
      body.push(chunk);
      console.log(body) //배열
    })
    .on('end', () => { //요청의 데이터가 모두 받아졌으면
      response.writeHead(200, defaultCorsHeader); /* Access-Control-Allow-Origin이 필요하기 때문에 적어주어야 한다. */
      body = Buffer.concat(body).toString().toUpperCase();/* 나중에 가서 buffer를 합쳐서 문자열화 시킨다. */
      console.log(body) //문자열
      response.end(body);
    })
  }
  else if(request.method === 'POST' && request.url === '/lower') {
    let body = [];
    request.on('error', err => {
      console.log(err);
    })
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      response.writeHead(200, defaultCorsHeader);
      body = Buffer.concat(body).toString().toLowerCase();
      response.end(body); //정보 탑재 후 브라우저로 전송
    })
  }
  console.log(
    `http request method is ${request.method}, url is ${request.url}`
  );
  //response.writeHead(200, defaultCorsHeader); /* response.end가 2개 있으면 에러가 난다. */
  //response.end('hello mini-server sprints');
});

server.listen(PORT, ip, () => {
  console.log(`http server listen on ${ip}:${PORT}`);
});

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept', //나는 이 헤더만 받을래..
  'Access-Control-Max-Age': 10 /* 프리플라이트 메시지를 보내는 주기 한 프리플라이트의 유효시간이 10초라는 의미이다. */
};