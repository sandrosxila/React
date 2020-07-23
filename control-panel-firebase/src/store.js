import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, combineReducers, compose } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
    apiKey: "AIzaSyAJnjD8phA4piEHn51cgd7ZwJ4KEcSKmLY",
    authDomain: "control-panel-firebase.firebaseapp.com",
    databaseURL: "https://control-panel-firebase.firebaseio.com",
    projectId: "control-panel-firebase",
    storageBucket: "control-panel-firebase.appspot.com",
    messagingSenderId: "191697100585",
    appId: "1:191697100585:web:e3a4723a4db2e9fb36e138"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
firebase.firestore();

if(localStorage.getItem('settings') == null){
    const defaultSettings = {
        disableBalanceOnAdd : true,
        disableBalanceOnEdit : false,
        allowRegistration : false
    }
    localStorage.setItem('settings',JSON.stringify(defaultSettings));
}

const initialState = {settings : JSON.parse(localStorage.getItem('settings'))};

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer
});



// Create store
const store = createStore(
    rootReducer,
    initialState,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

export default store;
