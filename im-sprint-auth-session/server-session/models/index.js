'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
// 데이터베이스와 연결을 진행합니다.
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
//models 폴더 내부에 존재하는 파일들을 읽어와 findOne, findAll과 같은 함수를 실행할수 있게끔 모델 인스턴스를 생성합니다.
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    //db.users와 같이 db 객체 내부에 모델 인스턴스를 저장합니다.
    db[model.name] = model;
  });
//associate 부분에 내용이 존재한다면 자동으로 관계를 형성합니다.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//여러 모델 인스턴스가 담긴 객체를 내보냅니다.
module.exports = db;
