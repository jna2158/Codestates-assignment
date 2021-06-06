require('colors');
const { assert } = require('chai');
const factoryService = require('./helper/FactoryService');
const {
  PART4_1,
  PART4_2,
  PART4_3,
  PART4_4,
  PART4_5,
  PART4_6,
  PART4_7,
  PART4_8,
  PART4_9,
  PART4_10
} = require('../script/part4');

describe('part 4 - 스키마와 함께하는 기본 SQL', function () {
  before(async function () {
    this.timeout(0); // disable timeout only this hook
    await factoryService.init();
    await factoryService.setup();
    await factoryService.part4_setup();
    console.log('\n🏭factory service starts.');
  });

  it('Q 4-1. user 테이블에 존재하는 모든 컬럼을 포함한 모든 데이터를 확인하기 위한 SQL을 작성해주세요.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-1]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_1}`.bold.yellow);

    // Mocha supports async functions out of the box, no plugins or configuration needed.
    // You can pass an async function to it(), and Mocha will handle any errors that occur.
    rowDataPacket = await factoryService.query(PART4_1);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);

    console.log(`\n   👇 THIS IS [PART4-1] TEST CASE`.bold.grey);
  });

  it('Q 4-2. user 테이블에 존재하는 모든 데이터에서 name 컬럼만을 확인하기 위한 SQL을 작성해주세요.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-2]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_2}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_2);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);
    console.log(`\n   👇 THIS IS [PART4-2] TEST CASE`.bold.grey);
  });

  it('Q 4-3. user 테이블에 데이터를 추가하기 위한 SQL을 작성해주세요.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-3]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_3}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_3);
    console.log(`\nTHIS IS USER TABLE : `);
    const factoryResponse = await factoryService.find({
      table: 'user',
      column: '*'
    });
    console.table(factoryResponse);
    assert.isOk(rowDataPacket);
    assert.lengthOf(factoryResponse, 5);
    const newDataRow = factoryResponse.find((row) => row.id === 5);
    assert.isOk(newDataRow);

    console.log(`\n   👇 THIS IS [PART4-3] TEST CASE`.bold.grey);
  });

  it('Q 4-4. user 테이블에서 특정 조건을 가진 데이터를 찾기위한 SQL을 작성해주세요. \n    조건 : name이 duhyunkim이여야 합니다.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-4]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_4}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_4);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);
    assert.lengthOf(rowDataPacket, 1);
    assert.strictEqual(rowDataPacket[0].name, 'duhyunkim');

    console.log(`\n   👇 THIS IS [PART4-4] TEST CASE`.bold.grey);
  });

  it('Q 4-5. user 테이블에서 특정 조건을 가진 데이터를 찾기위한 SQL을 작성해주세요. \n    조건 : name이 duhyunkim이 아니여야 합니다.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-5]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_5}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_5);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);
    assert.lengthOf(rowDataPacket, 4);
    rowDataPacket.forEach((record) => {
      assert.notStrictEqual(record.name, 'duhyunkim');
    });

    console.log(`\n   👇 THIS IS [PART4-5] TEST CASE`.bold.grey);
  });

  it('Q 4-6. content 테이블에 존재하는 모든 데이터에서 title 컬럼만을 찾기 위한 SQL을 작성해주세요.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-6]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_6}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_6);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);
    assert.lengthOf(rowDataPacket, 3);
    rowDataPacket.forEach((row) => {
      assert.isOk(row.title);
      assert.strictEqual(Object.keys(row).length, 1);
    });

    console.log(`\n   👇 THIS IS [PART4-6] TEST CASE`.bold.grey);
  });

  it('Q 4-7. content의 title과 그 컨텐츠를 작성한 user의 name을 찾기 위한 SQL을 작성해주세요. \n    저자가 없더라도, 켄턴츠의 title을 모두 찾아야합니다.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-7]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_7}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_7);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);
    assert.lengthOf(rowDataPacket, 3);
    const duhyunkimContent = rowDataPacket.find(
      (row) => row.name === 'duhyunkim'
    );
    assert.isOk(duhyunkimContent);
    assert.strictEqual(Object.keys(duhyunkimContent).length, 2);

    console.log(`\n   👇 THIS IS [PART4-7] TEST CASE`.bold.grey);
  });

  it('Q 4-8. content의 title과 그 컨텐츠를 작성한 user의 name을 찾기 위한 SQL을 작성해주세요. \n    저자가 있는 컨텐츠의 title만 찾아야합니다.', async () => {
    // When
    let rowDataPacket;
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-8]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_8}`.bold.yellow);

    rowDataPacket = await factoryService.query(PART4_8);
    console.log(`\nTHIS IS RESULT : `);
    console.table(rowDataPacket);
    assert.isOk(rowDataPacket);
    assert.lengthOf(rowDataPacket, 1);
    assert.strictEqual(rowDataPacket[0].title, 'database sprint');
    assert.strictEqual(rowDataPacket[0].name, 'duhyunkim');

    console.log(`\n   👇 THIS IS [PART4-8] TEST CASE`.bold.grey);
  });

  it('Q 4-9. content의 데이터를 수정하기 위한 SQL을 작성해주세요. \n   - title이 database sprint인 content 데이터에서 body를 "database is very easy"로 수정해야합니다.', async () => {
    // When
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-9]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_9}`.bold.yellow);

    await factoryService.query(PART4_9);
    console.log(`\nTHIS IS CONTENT TABLE: `);
    const factoryResponse = await factoryService.find({
      table: 'content',
      column: '*'
    });
    console.table(factoryResponse);
    assert.isOk(factoryResponse);
    assert.lengthOf(factoryResponse, 3);

    const databaseSprintContent = factoryResponse.find(
      (packet) => packet.title === 'database sprint'
    );
    assert.strictEqual(databaseSprintContent.body, 'database is very easy');

    console.log(`\n   👇 THIS IS [PART4-9] TEST CASE`.bold.grey);
  });

  it('Q 4-10. content의 데이터를 추가하기 위한 SQL을 작성해주세요. \n   - duhyunkim이 작성한 컨텐츠를 추가해주세요. 제목과 본문은 자유입니다. (참고: duhyunkim의 아이디는 1입니다.)', async () => {
    // When
    console.log(
      '----------------------------------------------------------------------------------------'
    );
    console.log('[PART4-10]\n'.bold.grey);
    console.log(`YOUR SQL STATMENT : `);
    console.log(`\n ${PART4_10}`.bold.yellow);

    await factoryService.query(PART4_10);
    console.log(`\nTHIS IS USER TABLE: `);
    const factoryResponse = await factoryService.find({
      table: 'content',
      column: '*'
    });
    console.table(factoryResponse);
    assert.isOk(factoryResponse);
    assert.lengthOf(factoryResponse, 4);
    const newDataRow = factoryResponse.find((row) => row.id === 4);
    assert.isOk(newDataRow);
    assert.isOk(newDataRow.title);
    assert.isOk(newDataRow.body);
    assert.isOk(newDataRow.created_at);
    assert.isOk(newDataRow.userId);
    assert.strictEqual(newDataRow.userId, 1);

    console.log(`\n   👇 THIS IS [PART4-10] TEST CASE`.bold.grey);
  });

  after(async () => {
    console.log(
      '\n----------------------------------------------------------------------------------------'
    );
    await factoryService.terminate();
    console.log('🏭factory service ends.');
  });
});
