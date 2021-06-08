'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * 시쿼라이즈가 실행할 시드 명령어를 작성합니다..
     *
     * 예시:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('Users', [
      {
        id: '0',
        userId: 'kimcoding',
        password: '1234',
        email: 'kimcoding@authstates.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * 시드를 취소하기 위한 명령어를 작성합니다.
     *
     * 예시:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  },
};
