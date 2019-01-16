const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', function(req, res, next) {
  res.send('bookmarks container');
});
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
    admin.database().ref(`data/bookmarks`).child(req.body.url).set({
      title: req.body.title,
      url: req.body.url
    });
    res.status(200).send({message:'Ok'});
  })
  module.exports = router;