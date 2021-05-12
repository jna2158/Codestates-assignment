const request = require("supertest");
require("jest");

const app = require("../basic-server");

describe("server", function () {
  afterAll(() => {
    app.close()
  });

  test("GET /messages 요청은 200 상태 코드를 응답해야 합니다", function (done) {
    return request(app)
      .get("/messages")
      .then(res => {
        expect(res.status).toEqual(200);
        done();
      });
  });
  test("GET /messages 요청은 파싱 가능한 JSON 문자열을 돌려줘야 합니다", function (done) {
    return request(app)
      .get("/messages")
      .then(res => {
        const isParsable = function (string) {
          try {
            JSON.parse(string);
            return true;
          } catch (e) {
            return false;
          }
        };
        expect(isParsable(res.text)).toEqual(true);
        done();
      });
  });
  test("GET /messages 요청의 응답은 객체의 형태여야 합니다", function (done) {
    return request(app)
      .get("/messages")
      .then(res => {
        const parsedBody = JSON.parse(res.text);
        expect(typeof parsedBody).toEqual("object");
        done();
      });
  });
  test("GET /messages 요청의 응답 객체는 `results`에 배열을 포함해야 합니다", function (done) {
    return request(app)
      .get("/messages")
      .then(res => {
        const parsedBody = JSON.parse(res.text);
        expect(typeof parsedBody).toEqual("object");
        expect(Array.isArray(parsedBody.results)).toEqual(true);
        done();
      });
  });
  test("올바른 POST /messages 요청을 처리할 수 있어야 합니다", function (done) {
    return request(app)
      .post("/messages")
      .send({
        username: "Jono",
        text: "Do my bidding!"
      })
      .then(res => {
        expect(res.status).toEqual(201);
        done();
      });
  });
  test("GET 요청시, 최근 POST 요청을 통해 제출한 메시지가 결과로 전달되어야 합니다", function (done) {
    return request(app)
      .post("/messages")
      .send({
        username: "Jono",
        text: "Do my bidding!"
      })
      .then(() => {
        return request(app)
          .get("/messages")
          .then(res => {
            const messages = JSON.parse(res.text).results;
            expect(messages[0].username).toEqual("Jono");
            expect(messages[0].text).toEqual("Do my bidding!");
            done();
          });
      });
  });
  test("존재하지 않는 endpoint를 요청할 때에, 404 상태 코드를 응답해야 합니다", function (done) {
    return request(app)
      .get("/codestates")
      .then(res => {
        expect(res.status).toEqual(404);
        done();
      });
  });
});
