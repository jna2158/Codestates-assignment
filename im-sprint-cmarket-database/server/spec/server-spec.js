/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql');
const axios = require('axios');
const expect = require('chai').expect;
const fs = require('fs');
const util = require('util');
const dotenv = require('dotenv');
dotenv.config();

const schema = fs.readFileSync('./schema.sql').toString();
const seed = fs.readFileSync('./seed.sql').toString();
const testDB = 'cmarket_test';

describe('Cmarket Database', () => {
  let dbConnection, app;
  before((done) => {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: process.env.DATABASE_SPRINT_PASSWORD,
      multipleStatements: true
    });
    dbConnection.connect(done);
  });

  describe('Cmarket Server', function () {
    beforeEach((done) => {
      /* Empty the db table befo test so that multiple tests
       * (or repeated runs of the tests) won't screw each other up: */
      dbConnection.query(
        `DROP DATABASE IF EXISTS ${testDB};
        CREATE DATABASE ${testDB};
        USE ${testDB};
        ${schema}
        ${seed}`,
        () => {
          if (!app) {
            app = require('../app');
          }
          done();
        }
      );
    });
    after(function () {
      dbConnection.end();
      app.close();
    });

    it('데이터베이스에 저장된 상품 목록을 가져와야합니다.', function (done) {
      axios
        .get('http://localhost:4000/items')
        .then((res) => res.data)
        .then((data) => {
          expect(data.length).to.equal(8);
        })
        .then(done)
        .catch(done);
    });

    it('주문내역을 데이터베이스에 저장해야합니다.', function (done) {
      const query = util.promisify(dbConnection.query).bind(dbConnection);

      axios({
        method: 'post',
        url: 'http://localhost:4000/users/1/orders/new',
        data: {
          orders: [
            { itemId: 1, quantity: 2 },
            { itemId: 2, quantity: 5 }
          ],
          totalPrice: 79800
        }
      })
        .then(() => {
          const queryString = 'SELECT * FROM orders';
          return query(queryString);
        })
        .then((result) => {
          expect(result.length).to.equal(1);
          expect(result[0].total_price).to.equal(79800);
        })
        .then(() => {
          const queryString = 'SELECT * FROM order_items';
          return query(queryString);
        })
        .then(result => {
          expect(result.length).to.equal(2);
          expect(result[0].order_id).to.equal(1);
          expect(result[0].item_id).to.equal(1);
          expect(result[0].order_quantity).to.equal(2);

          expect(result[1].order_id).to.equal(1);
          expect(result[1].item_id).to.equal(2);
          expect(result[1].order_quantity).to.equal(5);
        })
        .then(done)
        .catch(done);
    });

    it('데이터베이스에 저장된 주문내역을 가져와야합니다.', async function () {
      const postOrder = (data) => {
        return axios({
          method: 'post',
          url: 'http://localhost:4000/users/1/orders/new',
          data
        });
      };

      const payload = [
        {
          orders: [
            { itemId: 1, quantity: 2 },
            { itemId: 2, quantity: 5 }
          ],
          totalPrice: 79800
        },
        {
          orders: [
            { itemId: 5, quantity: 1 },
            { itemId: 6, quantity: 2 }
          ],
          totalPrice: 10700
        }
      ];

      await postOrder(payload[0]);
      await postOrder(payload[1]);

      await axios
        .get('http://localhost:4000/users/1/orders')
        .then((res) => res.data)
        .then((data) => {
          expect(data[0].id).to.equal(1);
          expect(data[0].image).to.equal('../images/egg.png');
          expect(data[0].name).to.equal('노른자 분리기');
          expect(data[0].order_quantity).to.equal(2);
          expect(data[0].price).to.equal(9900);
          expect(data[0].total_price).to.equal(79800);

          expect(data[3].id).to.equal(2);
          expect(data[3].image).to.equal('../images/fish.jpg');
          expect(data[3].name).to.equal('잉어 슈즈');
          expect(data[3].order_quantity).to.equal(2);
          expect(data[3].price).to.equal(3900);
          expect(data[3].total_price).to.equal(10700);
        });
    });
  });
});
