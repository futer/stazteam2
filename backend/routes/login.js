const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function (req, res, next) {
  res.send('login page');
});

module.exports = router;

router.post('/', function (req, res, next) {
  // admin.database().ref('data/users').orderByChild('email').equalTo(req.body.email).on("value", function (snapshot) {
  // });
  admin.database().ref('data/users').findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
    if (err) {
      return res.status(500).send('Błąd danych');
    }
    if (data) {
      const token = Helper.createJWT(data);
      //console.log(token);
      return res.status(200).send({ message: 'Ok' });
    } else {
      return res.status(400).send({ message: 'Nie odnaleziono danych' })
    }
  });
})


// ref.child('users').orderByChild('name').equalTo('John Doe').on("value", function(snapshot) {
//   console.log(snapshot.val());
//   snapshot.forEach(function(data) {
//       console.log(data.key);
//   });
// });