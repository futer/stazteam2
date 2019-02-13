const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     description: Saving bookmark to database.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: URL's title.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: url
 *         description: URL's path.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: bookmarkspost
 */
router.post('/', function (req, res, next) {
  const data = {
    title: req.body.title,
    text: req.body.text
  }
  admin.database().ref(`data/bookmarks`).push(data)
  .then(function (bookmark) {
      data.key = bookmark.key;
      return res.status(200).send(data);

  })
  .catch(function (error) {
    console.log("Error creating new bookmark:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})

router.get('/', function (req, res, next) {
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
  }
  admin.database().ref(`data/bookmarks`).once('value').then(function (snapshot) {
    console.log(snapshot.val());
    return res.status(200).send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  })
}),

router.put('/', function (req, res, next) {
  admin.database().ref(`data/bookmarks`).child(req.body.key).set({
    title: req.body.title,
    text: req.body.text
  }).then(function (bookmark) {
      console.log("Successfully updated new bookmark");
      return res.status(200).send({ message: 'Ok' });

  })
  .catch(function (error) {
    console.log("Error updating new bookmark:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})

router.delete('/:id', function (req, res, next) {
  admin.database().ref(`data/bookmarks`).child(req.params.id).remove().then(function (bookmark)
  {
    console.log("Successfully updated new bookmark");
    return res.status(200).send({ message: 'Ok' });
  }).catch( function(error)
  {
    console.log("Error updating new bookmark:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})
 
module.exports = router;