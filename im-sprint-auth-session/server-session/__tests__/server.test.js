const fs = require('fs')
describe('파일 및 환경 변수 테스트', () => {
  it('인증서 파일이 존재해야 합니다', () => {
    // fs.existsSync 함수가 사용하는 상대경로는 package.json 파일의 위치를 기준으로 합니다.
    // 서버 package.json의 위치에 인증서 파일들을 위치시켜야 합니다.
    expect(fs.existsSync('./key.pem')).to.be.true
    expect(fs.existsSync('./cert.pem')).to.be.true
  })

  it('환경 변수에 데이터베이스 비밀번호가 존재해야 합니다', () => {
    expect(process.env.DATABASE_PASSWORD).to.exist;
    expect(process.env.DATABASE_PASSWORD).not.to.include(';')
  })

})

const app = require('../index');
const request = require('supertest');
const agent = request(app);
const https = require('https');
const factoryService = require('./helper/FactoryService');
const databaseConnector = require('../lib/databaseConnector');
const DB_CONNECTOR = new databaseConnector();
const { expect, assert } = require('chai');
const { before } = require('mocha');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Authentication - Server', () => {

  before(async () => {

    await factoryService.init();
    console.log('\n  🏭factory service started.\n');
  });

  describe('Authentication - Database', () => {
    after(async () => {
      await DB_CONNECTOR.terminate();
    });



    it('성공적으로 데이터베이스에 연결해야 합니다', async () => {
      let response;

      console.log('DB configurations');
      console.table(DB_CONNECTOR['config']);

      try {
        response = await DB_CONNECTOR.init();
      } catch (e) {
        console.log(e);
      }

      assert.strictEqual(response, 'ok');
    });

    it('데이터베이스에 `Users` 테이블이 존재해야 합니다', async () => {
      await DB_CONNECTOR.init();

      try {
        await DB_CONNECTOR.query('DESCRIBE Users');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('Authentication - Server', () => {
    before(async () => {
      await DB_CONNECTOR.init();
      await factoryService.setup();
      await factoryService.insertTestUser();
    });

    after(async () => {
      await DB_CONNECTOR.terminate();
    });

    it('서버는 https 프로토콜을 사용해야 합니다', () => {
      expect(app instanceof https.Server).to.eql(true)
    });

    describe('⛳️ POST /users/login', () => {
      let failedResponse;
      let correctResponse;

      let resCookies;

      before(async () => {
        failedResponse = await agent.post('/users/login').send({
          userId: 'kimcoding',
          password: 'helloWorld',
        });

        correctResponse = await agent.post('/users/login').send({
          userId: 'kimcoding',
          password: '1234',
        });

        resCookies = correctResponse.header['set-cookie'][0];
      });
      it("로그인 요청시 잘못된 사용자 아이디 혹은 비밀번호를 전달할 경우, `not authorized` 메세지가 응답에 포함되어야 합니다", async () => {
        expect(failedResponse.body.message).to.eql('not authorized');
      });

      it("로그인 요청시 정확한 사용자 아이디와 비밀번호를 전달할 경우, `ok` 메세지가 응답에 포함되어야 합니다", async () => {
        expect(correctResponse.body.message).to.eql('ok');
      });

      describe('쿠키 옵션', () => {

        it('쿠키 옵션중 Domain 옵션은 `localhost`로 설정되어야 합니다', () => {
          expect(resCookies).include('Domain=localhost;');
        });

        it('쿠키 옵션중 Path 옵션은 `/`로 설정되어야 합니다', () => {
          expect(resCookies).include('Path=/;');
        });

        it('쿠키 옵션중 HttpOnly 옵션이 설정되어야 합니다', () => {
          expect(resCookies).include('HttpOnly');
        });

        it('쿠키 옵션중 Secure 옵션이 설정되어야 합니다', () => {
          expect(resCookies).include('Secure');
        });

        it('쿠키 옵션중 SameSite 옵션은 `none`으로 설정되어야 합니다', () => {
          expect(resCookies).include('SameSite=None');
        });
      });

      it('세션 아이디를 전달하기 위한 `connect.sid` 쿠키가 존재해야 합니다 (이 쿠키는 express-session 모듈이 만듭니다)', async () => {
        expect(resCookies).include('connect.sid');
      });
    });

    describe('⛳️ POST /users/logout', () => {
      let response;

      let resCookies;

      before(async () => {
        response = await agent.post('/users/login').send({
          userId: 'kimcoding',
          password: '1234',
        });

        resCookies = response.header['set-cookie'][0];
      });

      it('로그인 이후 로그아웃를 요청하는 경우, 상태코드 200을 리턴해야 합니다', async () => {
        const response = await agent
          .post('/users/logout')
          .set('Cookie', resCookies);

        expect(response.status).to.eql(200);
      });

      it('로그아웃 이후 혹은 로그인 전에 로그아웃을 요청하는 경우, 상태코드 400을 리턴해야 합니다', async () => {
        await agent.post('/users/logout').set('Cookie', resCookies);

        const response = await agent.post('/users/logout');

        expect(response.status).to.eql(400);
      });
    });

    describe('⛳️ GET /users/userinfo', () => {
      let response;

      let resCookies;

      before(async () => {
        response = await agent.post('/users/login').send({
          userId: 'kimcoding',
          password: '1234',
        });

        resCookies = response.header['set-cookie'][0];
      });

      it('로그인 이후 사용자 정보를 요청하는 경우 상태코드 200 및 `ok` 메세지를 리턴해야 합니다', async () => {
        const response = await agent
          .get('/users/userinfo')
          .set('Cookie', resCookies);

        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql('ok');
      });

      it('로그인이 되지 않은 상태에서 사용자 정보를 요청하는 경우, 상태코드 400 및 `not authorized` 메세지를 리턴해야 합니다', async () => {
        await agent.post('/users/logout').set('Cookie', resCookies);

        const response = await agent.get('/users/userinfo');

        expect(response.status).to.eql(400);
        expect(response.body.message).to.eql('not authorized');
      });
    });
  });

  after(async () => {
    await factoryService.terminate();
    console.log('\n  🏭factory service terminated.\n');
  });
});
