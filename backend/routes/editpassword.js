const express = require('express');
const router = express.Router();
const firebase = require('firebase');


router.get('/', function (req, res, next) {
  res.send('edit password page');
});

router.put('/', function (req, res, next) {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email,req.body.password);
  user.reauthenticateAndRetrieveDataWithCredential(cred).then(function () {
    user.updatePassword(req.body.newpassword).then(function () {
      return res.status(200).send({ message: 'Ok' });
    }).catch(function (error) {
      return res.status(400).send({ message: 'Not Ok' });
    })
  }).catch(function (error) {
    return res.status(400).send({ message: 'Invalid data' });
  });
})

module.exports = router;