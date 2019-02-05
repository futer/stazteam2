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
  console.log(req.body);
  admin.database().ref(`data/bookmarks`).child(req.body.title).set({
    title: req.body.title,
    text: req.body.text
  }).then(function (bookmark) {
      console.log("Successfully created new bookmark");
      return res.status(200).send({ message: 'Ok' });

  })
  .catch(function (error) {
    console.log("Error creating new bookmark:", error);
    return res.status(400).send({ message: 'Not Ok'})
  });
})

router.get('/', function (req, res, next) {
  console.log(req.body);
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
  }
  admin.database().ref(`data/bookmarks`).once('value').then(function (snapshot) {
    // console.log('a')
    return res.status(200).send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  })
}),
 
module.exports = router;