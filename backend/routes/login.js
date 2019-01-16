const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

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
  // console.log(req.body);
  // const databaseRef = admin.database().ref().child('data/users');
  // const querybaseRef = querybase.ref(databaseRef, ['email', 'password']);
  // const queriedDbRef = querybaseRef
  // .where({
  //   email: req.body.email,
  //   password: req.body.password
  // });
  // console.log(queriedDbRef);
  const user = {
    email: req.body.email,
    password: req.body.password
  }
  const token = jwt.sign({ user }, 'testkey');
    res.json({
      token: token
    });
    console.log(token);
})
