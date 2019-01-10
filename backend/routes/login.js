const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

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

  admin.database().ref('data/users').findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
    if (err) {
      return res.status(500).send('Błąd danych');
    }
    if (data) {
      //const token = Helper.createJWT(data);
      //console.log(token);
      return res.status(200).send({ message: 'Ok' });
    } else {
      return res.status(400).send({ message: 'Nie odnaleziono danych' })
    }
  });
})
