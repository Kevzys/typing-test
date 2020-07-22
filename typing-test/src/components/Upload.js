import React, {useState} from 'react';
import { Button } from '@material-ui/core';

function Upload(props) {

    const [uploaded, setUploaded] = useState(false);

    const firebase = require("firebase");
    require("firebase/firestore");
    let db = firebase.firestore();

    function generate_token(length) {
        let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let b = [];
        for (let i=0;i<length;i++) {
          let j = (Math.random() * (a.length-1)).toFixed(0);
          b[i] = a[j];
        }
        return b.join("");
      }

    function uploadToFirestore() {

        const test_id = generate_token(8);

        db.collection('users').doc(props.userID).collection('tests').doc(test_id).set({
            correct_type: props.correctType,
            incorrect_type: props.incorrType,
            user_has_typed: props.userType,
            words_per_minute: props.wpm,
        })
        .then(function() {
            console.log('Document written to firestore');
            setUploaded(true);
        })
        .catch(function(err) {
            console.log(err);
        })
    }
    return (
        <div>
            <Button 
                onClick={uploadToFirestore}
                variant="outlined"
                color="primary"
            >
                Upload
            </Button>
            <p>{uploaded? 'Test score has been uploaded': ''}</p>
        </div>
    )
}

export default Upload;