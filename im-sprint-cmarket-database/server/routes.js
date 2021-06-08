const router = require('express').Router();
const controller = require('./controllers');

// userId로 전체 주문 내역을 조회하는 라우팅
router.get('/:userId/orders', controller.orders.get);
// 쇼핑 카트에서 새로운 주문을 생성하는 라우팅
router.post('/:userId/orders/new', controller.orders.post);

module.exports = router;
