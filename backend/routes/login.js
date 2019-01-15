const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function (req, res, next) {
  res.send('login page');
});

module.exports = router;

router.post('/', function (req, res, next) {
  console.log(req.body);
  const databaseRef = admin.database().ref().child('data/users');
  const querybaseRef = querybase.ref(databaseRef, ['email', 'password']);
  const queriedDbRef = querybaseRef
  .where({
    email: req.body.email,
    password: req.body.password
  });
  console.log(queriedDbRef);
})
