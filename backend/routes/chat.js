const express = require('express');
const router = express.Router();
const firebase = require('firebase');

router.get('/', function (req, res, next) {
    res.send('edit page');
});

router.put('/', function (req, res, next) {
    firebase.database().ref(`data/users`).child(req.body.uid).update({
        is_banned: true,
    }).then(function () {
        return res.status(200).send({ message: 'Ok' });
    }).catch(function (error) {
        console.log('error', error);
        return res.status(400).send({ message: 'Not Ok' })
    });
});

router.post('/', function (req, res, next) {
    firebase.database().ref(`data/users`).
        orderByChild('uid').equalTo(req.body.uid).
        once('value').then((snapshot) => {
            user = snapshot.val();
            res.status(200).send({ user });
        }).catch((error) => {
            console.log('not kk');
            res.status(400).send({ message: 'Not ok' });
        });
});

module.exports = router;