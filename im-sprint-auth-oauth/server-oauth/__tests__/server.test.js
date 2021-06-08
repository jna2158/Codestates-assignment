const app = require('../index');
const request = require('supertest');
const agent = request(app);
const images = require('../resources/resources');
const { expect } = require("chai");
const nock = require('nock');
require('dotenv').config();
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const accessTokenRequestBody = {
  client_id: clientID,
  client_secret: clientSecret,
  code: 'fake_auth_code'
}

const accessTokenResponseData = {
  access_token: 'fake_access_token',
  token_type: 'Bearer',
  scope: 'user'
};

const callbackRequestBody = {
  authorizationCode: 'fake_auth_code'
}

describe(".env", () => {
  it(`should get clientID through dotenv`, async () => {
    expect(clientID).to.exist;
  });

  it(`should get clientSecret through dotenv`, async () => {
    expect(clientSecret).to.exist;
  });
})

describe('controller/callback.js', () => {
  it('authorization callback에 대한 handler에서는 GitHub access token 요청을 처리할 수 있어야 합니다.', async () => {
    const scope = nock('https://github.com')
      .post('/login/oauth/access_token', accessTokenRequestBody)
      .reply(200, accessTokenResponseData)

    await agent.post('/callback').send(callbackRequestBody)

    const ajaxCallCount = scope.interceptors[0].interceptionCounter;
    expect(ajaxCallCount, '요구사항에 맞는 ajax 요청을 보내지 않았습니다.').to.eql(1)
  })

  it('access token을 받아온 후에는, 클라이언트에 응답으로 전달해줘야 합니다.', async () => {
    nock('https://github.com')
      .post('/login/oauth/access_token', accessTokenRequestBody)
      .reply(200, accessTokenResponseData)

    const response = await agent.post('/callback').send(callbackRequestBody)

    expect(response.statusCode).to.eql(200)
    expect(response.body.accessToken).to.eql('fake_access_token')
  })
})

describe('controller/images.js', () => {
  it('access token이 주어지지 않는 경우 접근 권한을 제한해야 합니다.', async () => {
    const response = await agent.get('/images')

    expect(response.statusCode).to.eql(403)
    expect(response.body.message).to.eql('no permission to access resources')
  })

  it('access token이 주어지는 경우 접근 권한을 부여해야 합니다.', async () => {
    const response = await agent
      .get('/images')
      .set({
        authorization: 'token fake_access_token'
      })

    expect(response.statusCode).to.eql(200)
    expect(response.body.images).to.eql(images)
  })
})