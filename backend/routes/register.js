const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function (req, res, next) {
  res.send('register page');
});
router.post('/', function (req, res, next) {
  if (result.error) {
    return res.status(400).send({ message: result.error.message });
  }
  //admin.database().ref('/messages').push({original: original})
  //const usersRef = ref.child("users");
  admin.database().ref('data/users').push({
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password
  });
})
module.exports = router;
