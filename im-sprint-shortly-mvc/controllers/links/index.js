const models = require("../../models");
const { getUrlTitle } = require('../../modules/utils');
const { url: URLModel } = require('../../models');

module.exports = {
    get: async (req,res) => {
        const urls = await models.url.findAll();
        res.send(urls);
    },
    post: (req,res) => {
        const url = req.body.url;
        getUrlTitle(url, async (err, title) => {
            if(err) {
                res.status(400);
            } else {
                const urls = await models.url.create({ url, title });
                res.status(201).send(urls);
            }
        })
    },
    redirection: (req,res) => {
        URLModel
        .findOne({
          where: {
            id: req.params.id
          }
        })
        .then(result => {
          if (result) {
            return result.update({
              visits: result.visits + 1
            });
          } else {
            res.sendStatus(204);
          }
        })
        .then(result => {
          res.redirect(result.url);
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500);
        });
    }
} 