/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

node server 의 requestHandler는 항상 request, response를 인자로 받습니다.

또한 http 요청은 항상 요청과 응답이 동반 되어야 합니다.

이것들은 요청에 대한 정보를 담고 있습니다. 예를들면, 요청 url과 method 등을 담고 있습니다.

기본적인 로그를 작성 하세요

**************************************************************/
const express = require('express') 
const app = express(); 
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const cors = require('cors'); /* 404 안넣어도 되었던 이유가 cors에서 다 처리를 해주니까 */

app.use(cors());
app.use(jsonParser);
app.use(express.json()) /* 미들웨어. json 형태로 오는 요청의 body(payload)를 쉽게 받게 해준다. 모든 라우팅에 대해서 전체적용   */

const allMessages = { results : [] }

app.get('/messages', (request, response, next) =>{
    // response.status();
    // response.send();

    // response.writeHead(200)
    // response.end(JSON.stringify(allMessages));    /* end: return의 의미  */ /* json 형태로 응답을 준다 */ /*  */
    response.status(200).json(allMessages) /*  JSON.stringify 자동으로 해준다. */
    /* next() 나 다 끝났으니까 다음으로 넘긴다? */ 
}) 

app.post('/messages', function(request, response, next) {
    allMessages.results.push(request.body);
    response.writeHead(201)
    response.end(JSON.stringify(request.body));
})

// 간단한 로그를 작성 하는 것은, 서버를 디버깅 하는데 매우 수월하게 해줍니다.
// 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
/* eslint no-console: 0 */
//console.log("Serving request type " + request.method + " for url " + request.url);

// 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
// CORS에 대해서는 조금더 알아보세요.
//const headers = defaultCorsHeaders;
// 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
//headers["Content-Type"] = "text/plain";

// .writeHead() 메소드의 두번째 인자로는 응답 헤더와 키와 값을 객체 형태로 적어줍니다.
// response.writeHead(200, headers);

// 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
// response.end("Hello, World!");
//};  

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports = app;



/* 클라이언트랑 연결하려면 서로 포트를 일치시켜주어야 한다. CORS가 필요하다. */