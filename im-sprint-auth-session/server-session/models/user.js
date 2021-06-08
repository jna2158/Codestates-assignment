'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  /**
   * 해당 파일은 시퀄라이즈 ORM이 데이터베이스 쿼리를 진행하기 위해
   * 해당되는 테이블의 이름 및 어트리뷰트의 특성을 지정하는 파일입니다.
   * 또한 아래 associate 부분을 통해서 다른 테이블과의 관계를 작성할수 있습니다.
   * 
   * 이 파일은 서버가 실행되면 시퀄라이즈가 해당 내용을 바탕으로 findOne, findAll과 같은 함수를
   * 사용할수 있게끔 준비를 합니다.
   */
  class Users extends Model {

    static associate(models) {
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      userId: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
