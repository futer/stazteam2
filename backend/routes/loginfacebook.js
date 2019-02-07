const express = require('express');
const router = express.Router();
const firebase = require('firebase');

router.post('/', function (req, res, next) {

    const credential = firebase.auth.FacebookAuthProvider.credential(req.body.token);
    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (firebaseUser) {
        const user = firebase.auth().currentUser;
        return res.status(200).send({ user: user });
    }).catch(function(error) {
        return res.status(400).send({ message: 'Not Ok' });
    });
})

module.exports = router;