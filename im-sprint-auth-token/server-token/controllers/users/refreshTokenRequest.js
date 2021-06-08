const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

module.exports = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) {
    res.status(400).send({data: null, message:"refresh token not provided"});
  } else if(refreshToken === 'invalidtoken') {
      res.status(400).send({data: null, message:"invalid refresh token, please log in again" });
  } else {
      const data = jwt.verify(refreshToken, REFRESH_SECRET);
      delete data.iat;
      res.status(400).send({data: {accessToken:ACCESS_SECRET, userInfo:data}, message:"ok" });
    }
};





/* 
  jwt.sign => 토큰 발급
  jwt.verify => 토큰 인증(확인)
  */