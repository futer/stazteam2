const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


router.post('/', function (req, res, next) {
  console.log('a');
  const data = {
    title: req.body.title,
    text: req.body.text
  }
  admin.database().ref(`data/documents`).push(data)
  .then(function (document) {
      data.key = document.key;
      return res.status(200).send(data);

  })
  .catch(function (error) {
    console.log("Error creating new document:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})

router.get('/', function (req, res, next) {
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
  }
  admin.database().ref(`data/documents`).once('value').then(function (snapshot) {
    console.log(snapshot.val());
    return res.status(200).send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  })
}),

router.put('/', function (req, res, next) {
  admin.database().ref(`data/documents`).child(req.body.key).set({
    title: req.body.title,
    text: req.body.text
  }).then(function (document) {
      console.log("Successfully updated new document");
      return res.status(200).send({ message: 'Ok' });

  })
  .catch(function (error) {
    console.log("Error updating new document:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})

router.delete('/:id', function (req, res, next) {
  admin.database().ref(`data/documents`).child(req.params.id).remove().then(function (document)
  {
    console.log("Successfully updated new document");
    return res.status(200).send({ message: 'Ok' });
  }).catch( function(error)
  {
    console.log("Error updating new document:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})

module.exports = router;