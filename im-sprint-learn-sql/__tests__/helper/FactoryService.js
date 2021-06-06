const fs = require('fs');
const DatabaseConnector = require('../../lib/common/mysql');

const {
  User,
  Content,
  Category,
  Role,
  Content_Category
} = require('../fixtures/model');

const schema = fs.readFileSync('./migrations/schema.sql').toString();
class FactoryService extends DatabaseConnector {
  constructor() {
    super();
  }

  async create(model) {
    let insertValues = model || [];
    if (!Array.isArray(insertValues)) insertValues = [insertValues];
    if (insertValues.length === 0) return;

    // we should also typecheck for each element
    // but skip this for convenience
    const sample = insertValues[0];
    const table = sample.constructor.name.toLowerCase();

    insertValues.forEach((model) => {
      for (const col in model) {
        if (typeof model[col] === 'object') {
          const newCol = col + 'Id';
          model[newCol] = model[col].id || 'NULL';
          delete model[col];
        }
      }
    });

    const column = Object.keys(sample).join(',');
    const values = insertValues.map((model) => {
      const values = Object.values(model).join(',');
      return `(${values})`;
    });

    // HINT: console.log below query when you want to know what happen in test
    return await this.query(
      `INSERT INTO ${table} (${column}) VALUES ${values.join(',')}`
    );
  }

  async find({ table, column }) {
    return await this.query(`SELECT ${table}.${column} FROM ${table}`);
  }

  async setup() {
    await this.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`);
    await this.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);
    await this.query(`USE ${process.env.DATABASE_NAME}`);
    await this.query(schema);
  }

  async tearDown() {
    await this.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`);
    await this.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);
    await this.query(`USE ${process.env.DATABASE_NAME}`);
  }

  async insert(data, Constructor) {
    const rows = data.map((d) => new Constructor(d));
    await factoryService.create(rows);
  }

  async part4_setup() {
    const users = [
      {
        id: 1,
        name: `'duhyunkim'`,
        email: `'duhyun.kim@codestates.com'`
      },
      {
        id: 2,
        name: `'seunghwanoh'`,
        email: `'seunghwan.oh@codestates.com'`
      },
      {
        id: 3,
        name: `'junhongpark'`,
        email: `'junhong.park@codestates.com'`
      },
      {
        id: 4,
        name: `'jinsukjeong'`,
        email: `'jinsuk.jeong@codestates.com'`
      }
    ];
    // now there are 4 users in table
    await factoryService.insert(users, User);

    const contents = [
      {
        id: 1,
        title: `'database sprint'`,
        body: `'database is easy'`,
        user: users[0] // duhyunkim
      },
      {
        id: 2,
        title: `'deploy sprint'`,
        body: `'deploydeploy'`,
        user: { id: null }
      },
      {
        id: 3,
        title: `'first project'`,
        body: `'happyhacking'`,
        user: { id: null }
      }
    ];
    // now there are 3 contents in table
    await factoryService.insert(contents, Content);
  }

  async part5_setup() {
    const roles = [
      {
        id: 1,
        name: `'attacker'`
      },
      {
        id: 2,
        name: `'defense'`
      }
    ];
    // now there are 2 roles in table
    await factoryService.insert(roles, Role);

    const users = [
      {
        id: 1,
        name: `'jiSungPark'`,
        email: `'jisung.park@manchester.united'`,
        role: roles[0]
      },
      {
        id: 2,
        name: `'woonJaeLee'`,
        email: `'woonJae.Lee@goal.keeper'`,
        role: { id: null }
      },
      {
        id: 3,
        name: `'youngPyoLee'`,
        email: `'youngPyo.Lee@shadow.leg'`,
        role: roles[1]
      },
      {
        id: 4,
        name: `'myungBoHong'`,
        email: `'myungBo.Hong@korea.joojang'`,
        role: roles[1]
      },
      {
        id: 5,
        name: `'duRiCha'`,
        email: `'duRi.Cha@run.fast'`,
        role: roles[1]
      }
    ];
    // now there are 5 users in table
    await factoryService.insert(users, User);

    const contents = [
      {
        id: 1,
        title: `'soccer'`,
        body: `'There are two heart in my body'`,
        user: users[0] // jiSungPark
      },
      {
        id: 2,
        title: `'My Father'`,
        body: `'IS BOOM BOOM CHA'`,
        user: users[4] // duRiCha
      }
    ];
    // now there are 2 contents in table
    await factoryService.insert(contents, Content);

    const categories = [
      {
        id: 1,
        name: `'soccer'`
      },
      {
        id: 2,
        name: `'family'`
      },
      {
        id: 3,
        name: `'health'`
      }
    ];
    // now there are 3 categories in table
    await factoryService.insert(categories, Category);

    const contentCategories = [
      {
        id: 1,
        category: categories[0], // soccer
        content: contents[0] // jiSungPark's content
      },
      {
        id: 2,
        category: categories[2], // health
        content: contents[0] // jiSungPark's content
      },
      {
        id: 3,
        category: categories[1], // family
        content: contents[1] // duRiCha's content
      },
      {
        id: 4,
        category: categories[0], // soccer
        content: contents[1] // duRiCha's content
      }
    ];
    // now there are 4 content_categories in table
    await factoryService.insert(contentCategories, Content_Category);
  }
}

const factoryService = new FactoryService();

module.exports = factoryService;
