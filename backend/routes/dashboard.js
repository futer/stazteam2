const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function(req, res, next) {
  res.send('dashboard page');
});

router.delete('/:id', function (req, res, next) {
  admin.database().ref(`data/documents`).child(req.params.id).remove().then(function (document)
  {
    console.log("Successfully deleted new document");
    return res.status(200).send({ message: 'Ok' });
  }).catch( function(error)
  {
    console.log("Error deleting new document:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})
module.exports = router;