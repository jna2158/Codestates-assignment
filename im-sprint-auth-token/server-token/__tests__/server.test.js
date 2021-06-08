const fs = require('fs')

describe('파일 및 환경변수 테스트',()=>{
  it('인증서 파일이 존재해야 합니다',()=>{
    // fs.existsSync 함수가 사용하는 상대경로는 package.json 파일의 위치를 기준으로 합니다.
    // 서버 package.json의 위치에 인증서 파일들을 위치시켜야 합니다.
    expect(fs.existsSync('./key.pem')).to.be.true
    expect(fs.existsSync('./cert.pem')).to.be.true
  })

  it('환경변수에 데이터베이스 비밀번호가 존재해야 합니다',()=>{
    expect(process.env.DATABASE_PASSWORD).to.exist;
    expect(process.env.DATABASE_PASSWORD).not.to.include(';')
  })

  it('환경변수에 엑세스 토큰의 암호화 및 복호화에 사용할 비밀번호가 존재해야 합니다',()=>{
    expect(process.env.ACCESS_SECRET).to.exist;
    expect(process.env.ACCESS_SECRET).not.to.include(';')
  })
  
  it('환경변수에 새로운 엑세스 토큰을 만들기위한 비밀번호가 존재해야 합니다',()=>{
    expect(process.env.REFRESH_SECRET).to.exist;
    expect(process.env.REFRESH_SECRET).not.to.include(';')
  })

})

const app = require('../index');
const request = require('supertest');
const agent = request(app);
const { sign, verify } = require('jsonwebtoken');
const factoryService = require('./helper/FactoryService');
const databaseConnector = require('../lib/databaseConnector');
const DB_CONNECTOR = new databaseConnector();
const { expect, assert } = require('chai');
const https = require('https');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

describe('Authentication - Server', () => {
  before(async () => {
    await factoryService.init();
    console.log('\n  🏭factory service started.\n');
  });

  describe('Authentication - Database', () => {
    after(async () => {
      await DB_CONNECTOR.terminate();
    });

    it('데이터베이스와 연결할수 있어야 합니다', async () => {
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

    const tokenBodyData = {
      id: 1,
      userId: 'kimcoding',
      email: 'kimcoding@codestates.com',
      createdAt: '2020-11-18T10:00:00.000Z',
      updatedAt: '2020-11-18T10:00:00.000Z',
    };
    it('https 프로토콜을 사용하는 서버여야 합니다.',()=>{
      expect(app instanceof https.Server).to.eql(true)
    })

    describe('⛳️ POST /login', () => {
      it("로그인 요청시 전달받은 유저 아이디 혹은 비밀번호가 잘못된 경우, 'not authorized'메세지가 응답에 포함되어야 합니다", async () => {
        const response = await agent.post('/login').send({
          userId: 'kimcoding',
          password: 'helloWorld',
        });

        expect(response.body.message).to.eql('not authorized');
      });

      it("로그인 요청시 전달받은 유저아이디, 비밀번호가 데이터베이스에 저장된 정보와 완벽히 일치하는 경우, 'ok'메세지가 응답에 포함되어야 합니다", async () => {
        const response = await agent.post('/login').send({
          userId: 'kimcoding',
          password: '1234',
        });

        expect(response.body.message).to.eql('ok');
      });

      it("로그인 요청시 전달받은 유저아이디, 비밀번호가 데이터베이스에 저장된 정보와 완벽히 일치하는 경우, 응답에 accessToekn이 포함되어야 합니다", async () => {
        const response = await agent.post('/login').send({
          userId: 'kimcoding',
          password: '1234',
        });

        expect(response.body.data.accessToken).to.exist;
      });

      it(`응답에 전달되는 엑세스 토큰은 유저정보가 담긴 JWT 토큰이여만 합니다.
      \t- 환경변수중 ACCESS_SECRET 변수를 사용하세요.
      `, async () => {
        const response = await agent.post('/login').send({
          userId: 'kimcoding',
          password: '1234',
        });
        const tokenData = verify(
          response.body.data.accessToken,
          process.env.ACCESS_SECRET
        );

        expect(tokenData).to.exist;
        expect(Object.keys(tokenData)).to.eql([
          'id',
          'userId',
          'email',
          'createdAt',
          'updatedAt',
          'iat',
          'exp',
        ]);
      });

      it(`로그인 성공시 전달되는 응답객체에는 refreshToken이 존재해야 합니다.`, async () => {
        const response = await agent.post('/login').send({
          userId: 'kimcoding',
          password: '1234',
        });
        const refreshTokenCookieExists = response.headers[
          'set-cookie'
        ].some((cookie) => cookie.includes('refreshToken'));

        expect(refreshTokenCookieExists).to.eql(true);
      });
    });

    describe('⛳️ GET /accesstokenrequest', () => {
      it(`헤더 authorization 부분이 없는 요청 혹은 잘못된 토큰을 전달받은 경우, 응답에는 'invalid access token' 메세지가 포함되어야 합니다`, async () => {
        const response = await agent.get('/accesstokenrequest');

        expect(response.body.data).to.eql(null);
        expect(response.body.message).to.eql('invalid access token');
      });

      it(`헤더 authorization 부분에 jwt 토큰이 존재하며 토큰에 유저정보가 담겨져 있는경우, 해당 유저의 정보를 리턴해야 합니다 `, async () => {
        const accessToken = sign(tokenBodyData, process.env.ACCESS_SECRET);
        const response = await agent
          .get('/accesstokenrequest')
          .set({ authorization: `Bearer ${accessToken}` });

        expect(response.body.data).to.have.keys('userInfo');
        expect(response.body.data.userInfo).to.not.have.keys('password');
        expect(response.body.data.userInfo).to.eql(tokenBodyData);
        expect(response.body.message).to.eql('ok');
      });
    });

    describe('⛳️ GET /refreshtokenrequest', () => {
      it(`쿠키에 리프레쉬 토큰이 없는 경우, 'refresh token not provided'메세지를 리턴해야 합니다`, async () => {
        const response = await agent.get('/refreshtokenrequest');

        expect(response.body.data).to.eql(null);
        expect(response.body.message).to.eql('refresh token not provided');
      });

      it(`유효하지 않은 리프레쉬 토큰을 전달받은 경우,  'invalid refresh token, please log in again'메세지를 보내야 합니다`, async () => {
        const response = await agent
          .get('/refreshtokenrequest')
          .set('Cookie', 'refreshToken=invalidtoken');

        expect(response.body.data).to.eql(null);
        expect(response.body.message).to.eql(
          'invalid refresh token, please log in again'
        );
      });

      it(`유효한 리프레쉬 토큰을 전달받은 경우, 새로운 엑세스 토큰 및 비밀번호를 포함하지 않은 유저정보를 리턴해야 합니다`, async () => {
        const refreshToken = sign(tokenBodyData, process.env.REFRESH_SECRET);
        const response = await agent
          .get('/refreshtokenrequest')
          .set('Cookie', `refreshToken=${refreshToken}`);

        expect(response.body.data).to.have.all.keys('accessToken', 'userInfo');
        expect(response.body.data.userInfo).to.not.have.keys('password');
        expect(response.body.data.userInfo).to.eql(tokenBodyData);
        expect(response.body.message).to.eql('ok');
      });
    });
  });

  after(async () => {
    await factoryService.terminate();
    console.log('\n  🏭factory service terminated.\n');
  });
});
