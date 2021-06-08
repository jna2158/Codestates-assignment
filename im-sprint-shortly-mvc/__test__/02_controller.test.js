const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = require('chai');
const { url: URLModel } = require('../models');
chai.use(chaiHttp);

describe('🚀 (2-1) controller 작성', () => {
  it('links controller 파일이 존재해야 합니다', () => {
    let hasLinksController = fs.existsSync('./controllers/links/index.js');
    expect(hasLinksController).to.be.true;
  });

  it('links controller에는 get, post 메소드가 각각 존재해야 합니다', () => {
    const linksController = require('../controllers/links');

    expect(linksController).to.have.property('get');
    expect(linksController).to.have.property('post');
  });

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
})

describe('🚀 (2-2) router 연결', () => {
  let linksController, app, server, spyGet, spyPost;
  before(() => {
    linksController = require('../controllers/links');
    spyGet = sinon.spy(linksController, 'get')
    spyPost = sinon.spy(linksController, 'post')
    app = require('../app.js');
    server = app.listen(5050);
  })

  it('POST /links는 links controller의 post 메소드를 실행합니다', (done) => {
    chai.request(app)
      .post('/links')
      .send({
        url: 'https://www.github.com'
      })
      .end((err, resp) => {
        expect(spyPost.callCount).to.be.eql(1)
        done();
      })
  })

  it('GET /links는 links controller의 get 메소드를 실행합니다', (done) => {
    chai.request(app)
      .get('/links')
      .end((err, resp) => {
        expect(spyGet.callCount).to.be.eql(1)
        done();
      })
  })

  after(() => {
    server.close()
    console.log('\n' + '='.repeat(80))
  })
})

describe('🚀 (2-3) controller 구현', () => {
  let app, recordId, visitCount;
  before(() => {
    app = require('../app.js')
    server = app.listen(5050)
  })

  it('POST /links은 url을 받아 단축 url로 만듭니다', (done) => {
    chai.request(app)
      .post('/links')
      .send({
        url: 'https://www.github.com'
      })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res).to.have.status(201)
        expect(res.body).to.have.include.keys([
          'id',
          'url',
          'title',
          'visits',
          'updatedAt',
          'createdAt'
        ]);

        console.table(res.body)

        recordId = res.body.id
        visitCount = res.body.visits

        expect(res.body.url).to.equal('https://www.github.com')
        expect(res.body.title).to.include('GitHub')

        done();
      })
  })

  it('GET /links는 urls 테이블의 목록을 JSON의 형태로 반환합니다', (done) => {
    chai.request(app)
      .get('/links')
      .end((err, res) => {
        if (err) {
          done(err)
          return
        }

        console.table(res.body)

        expect(res).to.have.status(200)
        expect(res.body).to.exist;

        let newRecord = res.body.filter(record => record.id === recordId)
        expect(newRecord).to.have.lengthOf(1)
        expect(newRecord[0].url).to.be.eql('https://www.github.com')
        expect(newRecord[0].title).to.be.include('GitHub')

        res.body.forEach((record) => {
          expect(record).to.have.include.keys([
            'id',
            'url',
            'title',
            'visits',
            'updatedAt',
            'createdAt'
          ])
        })

        done()
      })
  })

  it('GET /links/:id 을 요청하면 url 필드값으로 리디렉션합니다', async () => {
    const resp = await chai.request(app)
      .get(`/links/${recordId}`)
      .redirects(0)
      .send()

    expect(resp.header.location).to.be.eql('https://www.github.com')
  })

  it('GET /links/:id 을 요청하면, 해당 레코드의 visit count가 1 증가해야 합니다', async () => {
    const result = await URLModel.findOne({
      where: recordId
    });
    expect(result.visits).to.be.eql(visitCount + 1)
  })

  after(() => {
    server.close()
  })

})