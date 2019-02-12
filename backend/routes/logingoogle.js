const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const admin = require('firebase-admin');


router.post('/', function (req, res, next) {

    const credential = firebase.auth.GoogleAuthProvider.credential(req.body.token);
    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (firebaseUser) {
        admin.auth().createCustomToken(firebase.auth().currentUser.uid)
            .then(function (token) {
                return res.status(200).send({ token: token });
            })
            .catch(function (error) {
                return res.status(400).send({ message: 'Error creating custom token' })
            });
    }).catch(function (error) {
        return res.status(400).send({ message: 'Not Ok' });
    });
})

module.exports = router;