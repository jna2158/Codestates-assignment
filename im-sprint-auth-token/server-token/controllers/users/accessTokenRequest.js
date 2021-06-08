const { Users } = require('../../models');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = (req, res) => {
  if(req.headers.authorization) {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, ACCESS_SECRET);

    const payload = {
      id: data.id,
      userId: data.userId,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    res.status(200).send({data: {userInfo: payload}, message: "ok"})
  } else {
    res.status(400).send({ data: null, message: "invalid access token" });
  }
};
