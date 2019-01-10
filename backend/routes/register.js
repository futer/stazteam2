const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function (req, res, next) {
  res.send('register page');
});
router.post('/', function (req, res, next) {
  console.log(req.body);
  
  admin.database().ref('data/users').push({
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password
  });
  res.status(200).send({message:'Ok'});
})
module.exports = router;
