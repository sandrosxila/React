import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {UserIsAuthenticated,UserIsNotAuthenticated} from './components/auth/Auth'

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
import Login from "./components/auth/Login";

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router>
                    <div className="App">
                        <AppNavbar/>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={UserIsAuthenticated(Dashboard)}/>
                                <Route exact path='/client/add' component={ UserIsAuthenticated(AddClient)}/>
                                <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClient)}/>
                                <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetails)}/>
                                <Route exact path='/login' component={UserIsNotAuthenticated(Login)}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>

    );
}

export default App;
