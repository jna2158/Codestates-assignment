require('colors');
const { assert } = require('chai');

const factoryService = require('./helper/FactoryService');

const {
  PART5_1_1,
  PART5_1_2,
  PART5_1_3,
  PART5_1_4,
  PART5_2_1,
  PART5_2_2,
  PART5_2_3,
  PART5_2_4,
  PART5_2_5,
  PART5_2_6,
  PART5_2_7,
  PART5_2_8,
  PART5_2_9,
  PART5_2_10
} = require('../script/part5');

describe('part 5 - 추가 요구조건과 스키마', function () {
  before(async function () {
    this.timeout(0); // disable timeout only this hook
    await factoryService.init();
    await factoryService.setup();
    await factoryService.part5_setup();
    console.log('\n🏭factory service starts.');
  });

  describe('part 5-1. additional schema', () => {
    it('Q 5-1-1. category 테이블의 구조를 보기위한 SQL을 작성해주세요. \n    - 요구사항에 맞는 category 테이블을 작성해야만, 테스트를 통과합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-1-1]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_1_1}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_1_1);
      console.log(`\nTHIS IS CATEGORY TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const primaryKey = rowDataPacket.find((packet) => packet.Key === 'PRI');
      const nameColumn = rowDataPacket.find(
        (packet) => packet.Field === 'name'
      );

      // PK가 존재해야합니다.
      assert.isOk(primaryKey);

      // 요구사항에 맞는 컬럼이 존재해야합니다.
      assert.isOk(nameColumn);

      // 추가 요구사항에 맞는 사항들을 만족해야합니다.
      assert.strictEqual(primaryKey.Field, 'id');
      assert.strictEqual(primaryKey.Extra, 'auto_increment');
      assert.strictEqual(nameColumn.Field, 'name');

      console.log(`\n     👇 THIS IS [PART5-1-1] TEST CASE`.bold.grey);
    });

    it('Q 5-1-2. content_category 테이블의 구조를 보기위한 SQL을 작성해주세요. \n    - 요구사항에 맞는 content_category 테이블을 작성해야만, 테스트를 통과합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-1-2]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_1_2}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_1_2);
      console.log(`\nTHIS IS CONTENT_CATEGORY TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const primaryKey = rowDataPacket.find((packet) => packet.Key === 'PRI');
      const contentIdForeignKey = rowDataPacket.find(
        (packet) => packet.Key === 'MUL' && packet.Field === 'contentId'
      );
      const categoryIdForeignKey = rowDataPacket.find(
        (packet) => packet.Key === 'MUL' && packet.Field === 'categoryId'
      );

      // PK가 존재해야합니다. category, content FK가 존재해야합니다.
      assert.isOk(primaryKey);
      assert.isOk(contentIdForeignKey);
      assert.isOk(categoryIdForeignKey);

      // 추가 요구사항에 맞는 사항들을 만족해야합니다.
      assert.strictEqual(primaryKey.Field, 'id');
      assert.strictEqual(primaryKey.Extra, 'auto_increment');
      assert.strictEqual(contentIdForeignKey.Null, 'NO');
      assert.strictEqual(categoryIdForeignKey.Null, 'NO');

      console.log(`\n     👇 THIS IS [PART5-1-2] TEST CASE`.bold.grey);
    });

    it('Q 5-1-3. role 테이블의 구조를 보기위한 SQL을 작성해주세요. \n   - 요구사항에 맞는 role 테이블을 작성해야만, 테스트를 통과합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-1-3]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_1_3}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_1_3);
      console.log(`\nTHIS IS Role TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const primaryKey = rowDataPacket.find((packet) => packet.Key === 'PRI');
      const nameColumn = rowDataPacket.find(
        (packet) => packet.Field === 'name'
      );

      // PK가 존재해야합니다.
      assert.isOk(primaryKey);

      // 요구사항에 맞는 컬럼이 존재해야합니다.
      assert.isOk(nameColumn);

      // 추가 요구사항에 맞는 사항들을 만족해야합니다.
      assert.strictEqual(primaryKey.Field, 'id');
      assert.strictEqual(primaryKey.Extra, 'auto_increment');
      assert.strictEqual(nameColumn.Field, 'name');

      console.log(`\n     👇 THIS IS [PART5-1-3] TEST CASE`.bold.grey);
    });

    it('Q 5-1-4. user 테이블의 구조를 보기위한 SQL을 작성해주세요. \n    - 요구사항에 맞는 user 테이블을 작성해야만, 테스트를 통과합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-1-4]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_1_4}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_1_4);
      console.log(`\nTHIS IS USER TABLE INFORMATION : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const roleIdForeignKey = rowDataPacket.find(
        (packet) => packet.Key === 'MUL' && packet.Field === 'roleId'
      );
      assert.isOk(roleIdForeignKey);

      console.log(`\n     👇 THIS IS [PART5-1-4] TEST CASE`.bold.grey);
    });
  });

  describe('part 5-2. basic sql', () => {
    it('Q 5-2-1. category 테이블에 존재하는 데이터에서 id, name을 찾는 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-1]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_1}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_1);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 3);
      rowDataPacket.forEach((row) => {
        assert.isOk(row.id);
        assert.isOk(row.name);
        assert.lengthOf(Object.keys(row), 2);
      });

      console.log(`\n     👇 THIS IS [PART5_2_1] TEST CASE`.bold.grey);
    });

    it('Q 5-2-2. user의 name과 email 그리고 그 user가 속한 role name(컬럼명: roleName)을 찾기 위한 SQL을 작성해주세요. \n    - 속한 role이 없더라도, user의 name과 email,role name을 모두 찾아야합니다.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-2]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_2}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_2);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 5);
      const woonJaeLeeRow = rowDataPacket.find(
        (packet) => packet.roleName === null
      );
      assert.isOk(woonJaeLeeRow);
      assert.strictEqual(woonJaeLeeRow.email, 'woonJae.Lee@goal.keeper');

      console.log(`\n     👇 THIS IS [PART5_2_2] TEST CASE`.bold.grey);
    });

    it('Q 5-2-3. 어느 role에도 속하지 않는 user의 모든 컬럼 데이터를 찾기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-3]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_3}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_3);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 1);
      assert.strictEqual(rowDataPacket[0].id, 2);
      assert.strictEqual(rowDataPacket[0].name, 'woonJaeLee');
      assert.strictEqual(rowDataPacket[0].email, 'woonJae.Lee@goal.keeper');
      assert.strictEqual(rowDataPacket[0].roleId, null);

      console.log(`\n     👇 THIS IS [PART5_2_3] TEST CASE`.bold.grey);
    });

    it('Q 5-2-4. content_category 테이블에 존재하는 모든 칼럼의 데이터를 찾기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-4]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_4}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_4);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 4);

      console.log(`\n     👇 THIS IS [PART5_2_4] TEST CASE`.bold.grey);
    });

    it('Q 5-2-5. jiSungPark이 작성한 content의 title을 찾기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-5]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_5}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_5);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 1);
      assert.strictEqual(rowDataPacket[0].title, 'soccer');

      console.log(`\n     👇 THIS IS [PART5_2_5] TEST CASE`.bold.grey);
    });

    it('Q 5-2-6. JiSungPark이 작성한 content의 category name을 찾기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-6]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_6}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_6);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 2);

      const soccerRow = rowDataPacket.find(
        (packet) => packet.name === 'soccer'
      );
      assert.isOk(soccerRow);

      const healthRow = rowDataPacket.find(
        (packet) => packet.name === 'health'
      );
      assert.isOk(healthRow);

      console.log(`\n     👇 THIS IS [PART5_2_6] TEST CASE`.bold.grey);
    });

    it('Q 5-2-7. category의 name이 soccer인 content의 title, body, created_at을 찾기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-7]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_7}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_7);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 2);

      const soccerRow = rowDataPacket.find(
        (packet) => packet.title === 'soccer'
      );
      assert.isOk(soccerRow);
      assert.strictEqual(soccerRow.title, 'soccer');
      assert.strictEqual(soccerRow.body, 'There are two heart in my body');
      assert.isOk(soccerRow.created_at);

      const myFatherRow = rowDataPacket.find(
        (packet) => packet.title === 'My Father'
      );
      assert.isOk(myFatherRow);
      assert.strictEqual(myFatherRow.title, 'My Father');
      assert.strictEqual(myFatherRow.body, 'IS BOOM BOOM CHA');
      assert.isOk(myFatherRow.created_at);

      console.log(`\n     👇 THIS IS [PART5_2_7] TEST CASE`.bold.grey);
    });

    it('Q 5-2-8. category의 name이 soccer인 content의 title, body, created_at, user의 name을 찾기위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-8]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_8}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_8);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 2);

      const jiSungParkRow = rowDataPacket.find(
        (packet) => packet.name === 'jiSungPark'
      );
      assert.isOk(jiSungParkRow);
      assert.strictEqual(jiSungParkRow.title, 'soccer');
      assert.strictEqual(jiSungParkRow.body, 'There are two heart in my body');
      assert.isOk(jiSungParkRow.created_at);

      const duRiChaRow = rowDataPacket.find(
        (packet) => packet.name === 'duRiCha'
      );
      assert.isOk(duRiChaRow);
      assert.strictEqual(duRiChaRow.title, 'My Father');
      assert.strictEqual(duRiChaRow.body, 'IS BOOM BOOM CHA');
      assert.isOk(duRiChaRow.created_at);

      console.log(`\n     👇 THIS IS [PART5_2_8] TEST CASE`.bold.grey);
    });

    it('Q 5-2-9. duRiCha가 작성한 글의 개수 (컬럼명: ContentCount)를 출력하기 위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-9]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_9}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_9);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);
      assert.lengthOf(rowDataPacket, 1);
      assert.strictEqual(rowDataPacket[0].ContentCount, 1);

      console.log(`\n     👇 THIS IS [PART5_2_9] TEST CASE`.bold.grey);
    });

    it('Q 5-2-10. 각 user(컬럼명: name)가 작성한 글의 개수 \n      (컬럼명: ContentCount)를 출력하기 위한 SQL을 작성해주세요.', async () => {
      // When
      let rowDataPacket;
      console.log(
        '----------------------------------------------------------------------------------------'
      );
      console.log('[PART5-2-10]\n'.bold.grey);
      console.log(`YOUR SQL STATMENT : `);
      console.log(`\n ${PART5_2_10}`.bold.yellow);

      rowDataPacket = await factoryService.query(PART5_2_10);
      console.log(`\nTHIS IS RESULT : `);
      console.table(rowDataPacket);
      assert.isOk(rowDataPacket);

      const jiSungParkRow = rowDataPacket.find(
        (packet) => packet.name === 'jiSungPark'
      );
      assert.isOk(jiSungParkRow);
      assert.strictEqual(jiSungParkRow.ContentCount, 1);

      const woonJaeLeeRow = rowDataPacket.find(
        (packet) => packet.name === 'woonJaeLee'
      );
      assert.isOk(woonJaeLeeRow);
      assert.strictEqual(woonJaeLeeRow.ContentCount, 0);

      const youngPyoLeeRow = rowDataPacket.find(
        (packet) => packet.name === 'youngPyoLee'
      );
      assert.isOk(youngPyoLeeRow);
      assert.strictEqual(youngPyoLeeRow.ContentCount, 0);

      const myungBoHongRow = rowDataPacket.find(
        (packet) => packet.name === 'myungBoHong'
      );
      assert.isOk(myungBoHongRow);
      assert.strictEqual(myungBoHongRow.ContentCount, 0);

      const duRiChaRow = rowDataPacket.find(
        (packet) => packet.name === 'duRiCha'
      );
      assert.isOk(duRiChaRow);
      assert.strictEqual(duRiChaRow.ContentCount, 1);

      console.log(`\n     👇 THIS IS [PART5_2_10] TEST CASE`.bold.grey);
    });
  });

  after(async () => {
    console.log(
      '\n----------------------------------------------------------------------------------------'
    );
    await factoryService.terminate();
    console.log('🏭factory service ends.');
  });
});
