const { Users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
 const userInfo = await Users.findOne({
   where: {
     userId: req.body.userId,
     password: req.body.password
   }
 });

 if(!userInfo){
  res.status(400).send({
    data: null,
    message: 'not authorized'
  });
 }else{
  const payload = {
    id: userInfo.id, 
    userId: userInfo.userId, 
    email: userInfo.email, 
    createdAt: userInfo.createdAt, 
    updatedAt: userInfo.updatedAt
  }
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: '1d'
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: '2d'
  });

  // res.status(200).setHeader('Set-Cookie',refreshToken).send({
  //   data: {accessToken: accessToken},
  //   message: 'ok'
  // });
  res.status(200).cookie('refreshToken', refreshToken, {
    domain: 'localhost',
    path: '/login',
    maxAge: 24 * 6 * 60 * 10000,
    sameSite: 'None',
    httpOnly: true,
    secure: true,
  }).send({
    data: {accessToken: accessToken},
    message: 'ok'
  })
    
 }
};