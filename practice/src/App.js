import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import {Provider} from './context';

import Header from "./components/layout/Header";
import Contacts from "./components/pages/Contacts";
import AddContact from "./components/pages/AddContact";
import EditContact from "./components/pages/EditContact";
import About from "./components/pages/About"
import NotFound from "./components/pages/NotFound";

class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <div className="App">
                        <Header/>
                        <Switch>
                            <Route exact path='/' component={Contacts}/>
                            <Route exact path='/contact/add' component={AddContact}/>
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/contact/edit/:id' component={EditContact}/>
                            <Route component={NotFound}/>
                        </Switch>


                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
