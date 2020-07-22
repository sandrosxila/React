import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import {Provider} from 'react-redux';
import store, {rrfProps} from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from "./components/layout/Dashboard";
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from "./components/clients/ClientDetails";

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router>
                    <div className="App">
                        <AppNavbar/>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={Dashboard}/>
                                <Route exact path='/client/add' component={AddClient}/>
                                <Route exact path='/client/edit/:id' component={EditClient}/>
                                <Route exact path='/client/:id' component={ClientDetails}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>

    );
}

export default App;
