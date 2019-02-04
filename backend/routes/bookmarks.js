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
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
  }
  admin.database().ref(`data/bookmarks`).child(req.body.title).set({
    title: req.body.title,
    text: req.body.text
  });
  res.status(200).send({ message: 'Ok' });
})

router.get('/', function (req, res, next) {
  console.log(req.body);
  if (res.error) {
    return res.status(400).send({ message: res.error.message });
  }
  admin.database().ref(`data/bookmarks`).on('value', (snapshot) => {
    res.status(200).send(snapshot.val());
  }, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
  })

}),
 
module.exports = router;