const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function (req, res, next) {
  res.send('register page');
});

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: User's name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: surname
 *         description: User's surname.
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
 *         description: register
 */


router.post('/', function (req, res, next) {
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
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
