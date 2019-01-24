const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const firebase = require('firebase');

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
  console.log(req.body);
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
  }

  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.name,
    //photoURL: "http://www.example.com/12345678/photo.png",
  })
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      return res.status(200).send({ message: 'Ok' });

    })
    .catch(function (error) {
      console.log("Error creating new user:", error);
      return res.status(400).send({ message: 'Nie Ok'})
    });
})
module.exports = router;
