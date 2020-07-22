import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseAppProvider, useFirebaseApp, SuspenseWithPerf } from 'reactfire';
import { ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from './theme'

const firebaseConfig = {
  apiKey: "AIzaSyD_TEUG5hReXdKxR-GUzQxLy56jrporCBM",
  authDomain: "typing-test-3074a.firebaseapp.com",
  databaseURL: "https://typing-test-3074a.firebaseio.com",
  projectId: "typing-test-3074a",
  storageBucket: "typing-test-3074a.appspot.com",
  messagingSenderId: "728612703064",
  appId: "1:728612703064:web:b3bfddca1900ba3a99732d"
};



ReactDOM.render(

  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
     <SuspenseWithPerf
        fallback={'loading app...'}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        
    
    </SuspenseWithPerf>
  </FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
