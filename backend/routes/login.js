const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const firebase = require('firebase');


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
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function (firebaseUser) {
    const user = firebase.auth().currentUser;
    return res.status(200).send({ user });
  })
    .catch(function (error) {
      const user = 'false';
      return res.status(200).send({ user });
    });
})

router.get('/', function (req, res, next) {
  firebase.auth().signOut().then(function () {
    return res.status(200).send({ message: 'Signed Out'});
  }, function (error) {
    return res.status(400).send({ message: 'Sign Out Error'});
  });
});