import React, {useState} from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import Typography from '@material-ui/core/Typography';

function LoadPreviousResults(props) {

    /*
    const r = useFirestore()
        .collection('users').doc(props.userID)
        .collection('tests').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){ 
                console.log(doc.id, '=> ', doc.data());
                setPrevResults(prev => [...prev, doc.data()])
            })
        })

    
    console.log(prevResults);

    
        {
        prevResults.map(item => (
            <li key={item.id}>{item}</li>
        ))
    }
    */

    function GetPrevResults(){
        
        const [prevResults, setPrevResults] = useState([]);
        const ref = useFirestore().collection('users').doc(props.userID).collection('tests')
        const snap = useFirestoreCollectionData(ref);



        
        if (snap.length === 0) {
            return (
                    <div>
                    <p>This is your first time! Goodluck.</p>
                    </div>
                )
        }
        else {
            return (
                <div>
                    {snap.map(test => <div key={test.key}>{test.key}{test.words_per_minute} Words per Minute</div>)}
                </div>
            )
        }
        
    }

    return (
        <div>
            <Typography variant="h5">
                
                <GetPrevResults />
            </Typography>
        </div>

    )
}

export default LoadPreviousResults;