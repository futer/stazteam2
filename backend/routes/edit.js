const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const firebase = require('firebase');

router.get('/', function(req, res, next) {
  res.send('edit page');
});

router.put('/', function (req, res, next) {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: req.body.name,
    email: req.body.email
  }).then(function() {
    return res.status(200).send({ message: 'Ok' });
  }).catch(function(error) {
    return res.status(400).send({ message: 'Not Ok'})
  });
})

module.exports = router;