const models = require('../models');

module.exports = {
  orders: {
    get: (req, res) => {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(401).send('Unauthorized user.');
      } else {
        models.orders.get(Number(userId), (error, result) => {
          if (error) {
            res.status(404).send('No orders found.');
          } else {
            res.status(200).json(result);
          }
        });
      }
    },
    post: (req, res) => {
      const userId = req.params.userId;
      const { orders, totalPrice } = req.body;

      if (orders.length === 0) {
        return res.status(400).send('Bad request.');
      } else {
        models.orders.post(Number(userId), orders, totalPrice, (error, result) => {
          if (error) {
            res.status(404).send('Not found');
          } else {
            res.status(201).send('Order has been placed.');
          }
        });
      }
    }
  },
  items: {
    get: (req, res) => {
      models.items.get((error, result) => {
        if (error) {
          res.status(404).send('Not found');
        } else {
          res.status(200).json(result);
        }
      });
    }
  }
};
