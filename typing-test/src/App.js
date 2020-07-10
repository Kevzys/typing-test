import React, {useState, useEffect} from 'react';
import { useFirestoreDocData, useFirestore, SuspenseWithPerf} from 'reactfire';

function App() {

  const firebase = require("firebase");
// Required for side-effects
  require("firebase/firestore");
  let db = firebase.firestore();

  const postUploadStyle = {
    visibility: 'hidden'
  }

  const [toType, setToType] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit");
  //const [toTypeEasyList, setToTypeEasyList] = useState([]);
  let toTypeEasyList = [];
  let toTypeHardList = [];
  const [userType, setUserType] = useState("");
  const [correctType, setCorrectType] = useState(0);
  const [incorrType, setIncorrType] = useState(0);
  const [wpm, setWPM] = useState(0);


  //time state
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);


  //generate token function for firestore document creation
  function generate_token(length) {
    let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let b = [];
    for (let i=0;i<length;i++) {
      let j = (Math.random() * (a.length-1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  }
  
  //-----------------
  //timer functions
  //-----------------
  
  //toggles timer on and off
  function toggle() {
    setIsActive(!isActive);
  }


  //toggles reset timer
  function reset() {
    document.getElementById("typeInput").disabled = false;
    document.getElementById("typeInput").value = "";
    document.getElementById("typeInput").placeholder = "Start typing..."
    document.getElementById("easyButton").disabled = false;
    document.getElementById("hardButton").disabled = false;
    document.getElementById("uploadResults").disabled = true;
    document.getElementById("p-post-upload").style.visibility = 'hidden';
    setSeconds(0);
    setIsActive(false);
    setIncorrType(0);
    setCorrectType(0);
    setWPM(0);
  }

  //timer useEffect
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      document.getElementById("easyButton").disabled = true;
      document.getElementById("hardButton").disabled = true;
    }
    else if (!isActive && seconds !==0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval)
  }, [isActive, seconds]);

  //useEffect called whenever this is a change in state related to user input
  //specifically if backspace then change correct and incorrect characters count
  useEffect(()=> {
    checkSimilarity();
  }, [userType])

  function handleTyping(e) {
    if (isActive === false) {
      setIsActive(true);
    }
    setUserType(e.target.value);
    //updateToType(e.target.value);
    checkDone(e.target.value);
  }

  function checkDone(e) {
    if (e.length === toType.length) {
      toggle();
      document.getElementById("typeInput").disabled = true;
      document.getElementById("uploadResults").disabled = false;
      document.getElementById("p-wpm").style.visibility = "visible";

      calculateWPM();
    }
  }

  function checkSimilarity() {
    let userSplit = userType.split(""); //splits what the user has typed into arrays for indexing
    let corrTypeCount = 0;
    let incorrTypeCount = 0;

    //loops through all characters and checks matching
    for (const [index, element] of userSplit.entries()) {
      if (toType.charAt(index) === element) {
        
        corrTypeCount++;
      }
      else {
        incorrTypeCount++;
        
      }
    }

    //updates correct and incorrect values dynamically
    setIncorrType(incorrTypeCount);
    setCorrectType(corrTypeCount);
  }

  function GetEasyQueriesFromFirestore() {
    const toTypeCollectionRef = useFirestore()
      .collection('to-type-collection')
      .doc('to-type-easy');

    const toTypeInfo = useFirestoreDocData(toTypeCollectionRef);

    //Iterate through an object and output all values (item is the key, toTypeInfo[item] is the value)
    Object.keys(toTypeInfo).forEach((item)=> {
      toTypeEasyList.push(toTypeInfo[item]);
    });

    return <div></div>;
  }

  function GetHardQueriesFromFirestore() {
    const toTypeCollectionRef = useFirestore()
      .collection('to-type-collection')
      .doc('to-type-hard');
    
    const toTypeInfo = useFirestoreDocData(toTypeCollectionRef);
    
    Object.keys(toTypeInfo).forEach((item)=> {
      toTypeHardList.push(toTypeInfo[item]);
    });
    return <div></div>;
  }

  function changeEasyQuery () {
    setToType(toTypeEasyList[Math.floor(Math.random() * toTypeEasyList.length)]);
  }

  function changeHardQuery () {
    setToType(toTypeHardList[Math.floor(Math.random() * toTypeHardList.length)]);

  }

  function uploadScoreToFirestore() {
    let token = generate_token(8);
    calculateWPM();
    db.collection("typing-test-data").doc(token).set({
      correct_type: correctType,
      incorrect_type: incorrType,
      user_has_typed: userType,
      words_per_minute: wpm,
    })
    .then(function() {
      console.log("Document written successfully");
      document.getElementById("p-post-upload").style.visibility = 'visible';
    })
    .catch(function(error) {
      console.log(error);
    })

    document.getElementById("uploadResults").disabled = true;
  }
  
  function calculateWPM() {
    //splits words typed by spaces and then calculates for WPM
    let a = userType.split(" ");
    setWPM((a.length/seconds) * 60);
  }

  return (
    <div className="container">
        <h1>How fast can you type?</h1>
          
          <input size="50" id="typeInput" placeholder="Start typing..." onChange={handleTyping}/>

          <p className="toTypeClass">{toType}</p>
          
          <p>Select  Difficulty Below</p>
          <button id="easyButton" onClick={changeEasyQuery}>Easy</button>
          <button id="hardButton" onClick={changeHardQuery}>Hard</button>
          <br/>
          <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
          <button onClick={reset}>Reset</button>

          <h2>{seconds}</h2>


          <p>Correct characters: {correctType}</p>
          <p>Incorrect characters: {incorrType}</p>
          <p id ="p-wpm">Words Per Minute: {wpm}</p>
          <button id="uploadResults" onClick={uploadScoreToFirestore}>Upload Score</button>
          <p id="p-post-upload" style={postUploadStyle}>Results uploaded, press reset to try again for a better score!</p>
          <SuspenseWithPerf
            fallback={'loading burrito status...'}
            traceId={'load-burrito-status'}
          >
            
            <GetEasyQueriesFromFirestore />
            <GetHardQueriesFromFirestore />
          </SuspenseWithPerf>
        
    </div>  
  );
}

export default App;
