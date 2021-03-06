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

    // console.log(firebaseUser);
    console.log(firebase.auth().currentUser.uid);
    admin.auth().createCustomToken(firebase.auth().currentUser.uid)
      .then(function (user) {
        console.log(user);
        return res.status(200).send({ user: user });
      })
      .catch(function (error) {
        console.log(error);
        return res.status(400).send({ message: 'Error creating custom token' })
      });
  })
    .catch(function (error) {
      console.log(error);
      const user =  null;
      return res.status(200).send({ user: user });
    });
})

router.get('/', function (req, res, next) {
  firebase.auth().signOut().then(function () {
    return res.status(200).send({ message: 'Signed Out' });
  }, function (error) {
    return res.status(400).send({ message: 'Sign Out Error' });
  });
});