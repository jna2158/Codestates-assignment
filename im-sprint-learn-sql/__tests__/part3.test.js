require('colors');
const { assert } = require('chai');
const factoryService = require('./helper/FactoryService');
const { PART3_1, PART3_2, PART3_3 } = require('../script/part3');

describe('part 3. 데이터베이스 연결과 스키마', function () {
  describe('part 3-1. connection test', () => {
    it('should be successful by initialize factoryService instance.', async () => {
      console.log(`
      <YOUR DATABASE CONFIG>
  
      host : ${factoryService.config.host}
      user : ${factoryService.config.user}
      password : ${factoryService.config.password}
      `);

      const response = await factoryService.init();
      assert.strictEqual(response, 'ok');
    });

    it('should be successful to query via factoryService instance.', async () => {
      const rowDataPacket = await factoryService.query(
        `SELECT "codestates" AS "createdBy"`
      );

      assert.lengthOf(rowDataPacket, 1);
      assert.strictEqual(rowDataPacket[0]['createdBy'], 'codestates');
    });

    after(async () => {
      await factoryService.terminate();
    });
  });

  describe('part 3-2. schema', () => {
    before(async function () {
      this.timeout(0); // disable timeout only this hook
      await factoryService.init();
      await factoryService.setup();
      console.log('\n🏭factory service starts.');
    });

    it('Q 3-1. 현재 있는 데이터베이스에 존재하는 모든 테이블 정보를 보기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART3-2-1]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART3_1}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART3_1);
      console.log(`\n✅ Just check your entire tables in database`);
      console.log(`\nTHIS IS YOUR TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.isOk(rowDataPacket.length > 0);
      console.log(`\n     👇🏻 THIS IS [PART3-2-1] TEST CASE`.bold.grey);
    });

    it('Q 3-2. user 테이블의 구조를 보기위한 SQL을 작성해주세요. \n    요구사항에 맞는 user 테이블을 작성해야만, 테스트를 통과합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART3-2-2]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART3_2}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART3_2);
      console.log(`\nTHIS IS USER TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const primaryKey = rowDataPacket.find((packet) => packet.Key === 'PRI');
      const nameColumn = rowDataPacket.find(
        (packet) => packet.Field === 'name'
      );
      const emailColumn = rowDataPacket.find(
        (packet) => packet.Field === 'email'
      );

      // PK가 존재해야합니다.
      assert.isOk(primaryKey);

      // 요구사항에 맞는 컬럼이 존재해야합니다.
      assert.isOk(nameColumn);
      assert.isOk(emailColumn);

      // 추가 요구사항에 맞는 사항들을 만족해야합니다.
      assert.strictEqual(primaryKey.Field, 'id');
      assert.strictEqual(primaryKey.Extra, 'auto_increment');
      assert.strictEqual(nameColumn.Field, 'name');

      console.log(`\n     👇🏻 THIS IS [PART3-2-2] TEST CASE`.bold.grey);
    });

    it('Q 3-3. content 테이블의 구조를 보기위한 SQL을 작성해주세요. \n    요구사항에 맞는 content 테이블을 작성해야만, 테스트를 통과합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );

      console.log('[PART3-2-3]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART3_3}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART3_3);
      console.log(`\nTHIS IS USER TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const primaryKey = rowDataPacket.find((packet) => packet.Key === 'PRI');
      const userIdForeignKey = rowDataPacket.find(
        (packet) => packet.Key === 'MUL' && packet.Field === 'userId'
      );

      const titleColumn = rowDataPacket.find(
        (packet) => packet.Field === 'title'
      );
      const bodyColumn = rowDataPacket.find(
        (packet) => packet.Field === 'body'
      );
      const createdAtColumn = rowDataPacket.find(
        (packet) => packet.Field === 'created_at'
      );

      // PK가 존재해야합니다. user FK가 존재해야합니다.
      assert.isOk(primaryKey);
      assert.isOk(userIdForeignKey);

      // 요구사항에 맞는 컬럼이 존재해야합니다.
      assert.isOk(titleColumn);
      assert.isOk(bodyColumn);
      assert.isOk(createdAtColumn);

      // 추가 요구사항에 맞는 사항들을 만족해야합니다.
      assert.strictEqual(primaryKey.Field, 'id');
      assert.strictEqual(primaryKey.Extra, 'auto_increment');
      assert.strictEqual(userIdForeignKey.Null, 'YES');
      assert.strictEqual(createdAtColumn.Type, 'timestamp');
      assert.strictEqual(createdAtColumn.Default, 'CURRENT_TIMESTAMP');

      console.log(`\n     👇🏻 THIS IS [PART3-2-3] TEST CASE`.bold.grey);
    });
  });

  after(async () => {
    await factoryService.terminate();
    console.log('\n  🏭factory service ends.');
  });
});
