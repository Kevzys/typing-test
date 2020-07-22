import React from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';


function GetQueries(props) {

    function GetEasyQueriesFromFirestore() {
        const toTypeCollectionRef = useFirestore()
          .collection('to-type-collection')
          .doc('to-type-easy');

        const toTypeInfo = useFirestoreDocData(toTypeCollectionRef); //map through ref in the dom ()
        //const k = Object.keys(toTypeInfo);
        //console.log( toTypeInfo[k[k.length * Math.random() << 0]]);  
    
        //Iterate through an object and output all values (item is the key, toTypeInfo[item] is the value)
        Object.keys(toTypeInfo).forEach((item)=> {
          props.toTypeEasyList.push(toTypeInfo[item]);
        });
    
        return <div></div>;
      }
    
      function GetHardQueriesFromFirestore() {
        const toTypeCollectionRef = useFirestore()
          .collection('to-type-collection')
          .doc('to-type-hard');
        
        const toTypeInfo = useFirestoreDocData(toTypeCollectionRef);
        
        Object.keys(toTypeInfo).forEach((item)=> {
          props.toTypeHardList.push(toTypeInfo[item]);
        });
        return <div></div>;
      }
    
    return (
        <div>
            <GetEasyQueriesFromFirestore />
            <GetHardQueriesFromFirestore />
        </div>
    )
}

export default GetQueries;