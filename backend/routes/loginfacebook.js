const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const admin = require('firebase-admin');

router.post('/', function (req, res, next) {

    const credential = firebase.auth.FacebookAuthProvider.credential(req.body.token);
    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (firebaseUser) {
        
        checkuser()
            .then(user => {
                if (user) {
                    console.log('user exist');
                } else {
                    admin.database().ref(`data/users`).child(firebase.auth().currentUser.uid).set({
                        uid: firebase.auth().currentUser.uid,
                        role: '0',
                        is_banned: false,
                        is_admin: false,
                    });
                }
            });

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

const checkuser = async function () {
    let user = null;
    await admin.database().ref(`data/users`).
        orderByChild('uid').equalTo(firebase.auth().currentUser.uid).
        once('value').then((snapshot) => {
            user = snapshot.val();
        }).catch((error) => {
            console.log('not ok');
        });

    return user;
}

module.exports = router;