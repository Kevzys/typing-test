import React, {useState, } from 'react';
import { useAuth, useUser} from 'reactfire';


import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


import CheckSimilarity from './components/CheckSimilarity';
import Timer from './components/Timer';
import UserType from './components/UserType';
import GetQueries from './components/GetQueries';
import Upload from './components/Upload';
import LoadPreviousResults from './components/LoadPreviousResults';



function App( ) {

  const auth = useAuth;
  const firebase = require("firebase");

  const [toType, setToType] = useState("Lorem ipsum dolor sit amet, consectetur adipisicing elit");
  //const [toTypeEasyList, setToTypeEasyList] = useState([]);
  let toTypeEasyList = [];
  let toTypeHardList = [];
  const [userType, setUserType] = useState("");
  const [correctType, setCorrectType] = useState(0);
  const [incorrType, setIncorrType] = useState(0);
  const [wpm, setWPM] = useState(0);
  const userID = useUser().uid

  //previous results
  //const [hasPrevResults, setHasPrevResults] = useState(false);
  //const [prevResults, setPrevResults] = useState([]);


  //time state
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);


  auth().signInAnonymously().catch(function(err) {
    console.log("authen did not work");
  })




// Required for side-effects
  require("firebase/firestore");
  let db = firebase.firestore();
  db.collection('users').doc(userID).set({
    uid: userID
  })


  function changeEasyQuery () {
    setToType(toTypeEasyList[Math.floor(Math.random() * toTypeEasyList.length)]);
  }

  function changeHardQuery () {
    setToType(toTypeHardList[Math.floor(Math.random() * toTypeHardList.length)]);
  }


  return (
    <div>
      <Grid container spacing={3} alignContent="center" alignItems="center" direction="column">
        <Grid item xs={12}>
          <GetQueries 
            toTypeEasyList={toTypeEasyList}
            toTypeHardList={toTypeHardList}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            How Fast Can You Type?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Look at your previous test scores below.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <LoadPreviousResults 
            userID={userID}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">
            Select difficulty below and start typing the following paragraph in the input box. 
          </Typography>
        </Grid>
        <Grid item>
          <Button  color="secondary" variant="outlined" onClick={changeEasyQuery}>Easy</Button>
          <Button  color="secondary" variant="outlined" onClick={changeHardQuery}>Hard</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Type: {toType}
          </Typography>
        </Grid>
        

        <Grid container spacing={3}  justify="center" direction="row">

          <Grid item xs={3}>
            <UserType 
              isActive={isActive}
              setIsActive={setIsActive}
              setUserType={setUserType}
              userType={userType}
              toType={toType}
              seconds={seconds}
              setWPM={setWPM}
            />
          </Grid>

          <Grid xs={3}>
            <Grid container direction="column">

              <Grid item>
                <CheckSimilarity 
                  userType={userType}
                  toType={toType}
                  correctType={correctType}
                  incorrType={incorrType}
                  setCorrectType={setCorrectType}
                  setIncorrType={setIncorrType}
                />
              </Grid>

              <Grid item>
                <p id ="p-wpm">Words Per Minute: {wpm}</p>
              </Grid>

              <Grid item>
                <Timer 
                  setIsActive={setIsActive}
                  isActive={isActive}
                  setSeconds={setSeconds}
                  seconds={seconds}
                />
              </Grid>
            </Grid>
          </Grid>

        </Grid>

      <Grid item>
        <Upload 
          correctType={correctType}
          incorrType={incorrType}
          userType={userType}
          wpm={wpm}
          userID={userID}
        />
      </Grid>
        
      </Grid>

    </div>  
  );
}

export default App;
