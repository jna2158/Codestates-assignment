const fs = require('fs');
const Sequelize = require('sequelize');
const { expect } = require('chai');
const { sequelize } = require('../models');

describe('🚀 (1-1) ORM 설정', () => {
  it('cli를 통해 필요한 파일이 자동으로 만들어졌는지 확인합니다', () => {
    const hasModelIndex = fs.existsSync('./models/index.js');
    const hasConfig = fs.existsSync('./config/config.json');
    const hasMigrations = fs.existsSync('./migrations');
    expect(hasModelIndex).to.be.true;
    expect(hasConfig).to.be.true;
    expect(hasMigrations).to.be.true;
  });

  it('model/index.js 파일이 유효한지 확인합니다', () => {
    expect(sequelize).to.be.instanceof(Sequelize);
  });

  it('mysql에 접속할 수 있는지 확인합니다', async () => {
    try {
      await sequelize.authenticate();
      expect(true).to.be.true;
    } catch (error) {
      console.error(`
  --------------------------------------------------------------------------------
  MySQL에 접속할 수 없습니다. 로그를 통해 원인을 분석하고, 접속할 수 있도록 config.json을 설정하세요.
  --------------------------------------------------------------------------------
  `, error);
      expect().to.throw(Error);
    }
  })

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
});

describe('🚀 (1-2) 모델 생성', () => {
  let urlModel;

  before(() => {
    urlModel = require('../models').url;
  })

  it('url 모델이 존재해야 합니다', () => {
    expect(urlModel).to.exist;
  })

  it('url 모델은 요구하는 필드를 갖고 있어야 합니다', () => {
    const keys = Object.keys(urlModel.tableAttributes);
    console.table(keys);
    expect(keys).to.include.members([
      'id',
      'url',
      'title',
      'visits',
      'createdAt',
      'updatedAt'
    ])
  })

  it('url 모델의 각 필드는 정해진 타입으로 생성되어야 합니다', () => {
    const fieldTypeMap = {
      id: 'INTEGER',
      url: 'STRING',
      title: 'STRING',
      visits: 'INTEGER',
      createdAt: 'DATE',
      updatedAt: 'DATE'
    }
    for (let key in urlModel.tableAttributes) {
      if (key !== 'userId') {
        expect(urlModel.tableAttributes[key].type.constructor.name).to.be.eql(fieldTypeMap[key])
      }
    }
  })

  it('url 모델의 visits 필드는 기본값이 0이어야 합니다', () => {
    expect(urlModel.tableAttributes.visits.defaultValue).to.be.eql(0)
  })

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
});


describe('🚀 (1-3) 마이그레이션', () => {
  let urlModel;

  before(() => {
    urlModel = require('../models').url;
  })

  it('마이그레이션을 했다면, urls 테이블이 존재해야 합니다', async () => {
    const [results] = await sequelize.query('describe urls');
    const fieldTypeMap = results.map(r => [r.Field, r.Type])
    console.table(fieldTypeMap)

    expect(fieldTypeMap).to.deep.include.members([
      ['id', 'int'],
      ['url', 'varchar(255)'],
      ['title', 'varchar(255)'],
      ['visits', 'int'],
      ['createdAt', 'datetime'],
      ['updatedAt', 'datetime']
    ])
  });

  after(() => {
    console.log('\n' + '='.repeat(80))
  })
});
