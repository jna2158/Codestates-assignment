const db = require('../db');

module.exports = {
  orders: {
    get: (userId, callback) => {
       // TODO: 해당 유저가 작성한 모든 주문을 가져오는 함수를 작성하세요
      let sql = `
        select orders.id, items.image, items.name, items.price, order_items.order_quantity, orders.total_price
        from order_items
        join items on items.id = order_items.item_id
        join orders on orders.id = order_items.order_id
        where orders.user_id = ${userId}`
      db.query(sql, (err, results) => {
        if(err) throw err;
        callback(err, results);
      })
    },
    post: (userId, orders, totalPrice, callback) => {
      // TODO: 해당 유저의 주문 요청을 데이터베이스에 생성하는 함수를 작성하세요
      let sql_orders = `insert into orders (user_id, total_price) values (${userId}, ${totalPrice})`; 
      db.query(sql_orders, (err, results) => {
        if(err) throw err;
        var params = orders.map((el) => {
          return [results.insertId, el.itemId, el.quantity];
        })
        let sql_order_items = `insert into order_items(order_id, item_id, order_quantity) values ?`
        db.query(sql_order_items, [params], (err, results) => {
          if(err) throw err;
          callback(err, results);
        })
      })  
    }
  },
  items: {
    get: (callback) => {
      // TODO: Cmarket의 모든 상품을 가져오는 함수를 작성하세요
      let sql = `select * from items`
      db.query(sql, (err, results, fields) => {
        callback(err, results)
      })
    }
  }
};
