const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const firebase = require('firebase');

router.get('/', function (req, res, next) {
  res.send('login page');
});
/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
module.exports = router;

router.post('/', function (req, res, next) {

  const user = {
    email: req.body.email,
    password: req.body.password
  }
  console.log('a');
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function (firebaseUser) {
    const token = jwt.sign({ user }, 'testkey');
      res.json({
        token: token
      });
      console.log(token);
    return res.status(200).send({ message: 'Ok' });
  })
    .catch(function (error) {
      console.log('b');
      return res.status(400).send({ message: 'Nie Ok'});
    });


})
