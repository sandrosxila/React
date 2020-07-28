import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Navbar from "./components/layout/Navbar";
import PostBoard from "./components/postboard/PostBoard";
import AddPost from "./components/add/AddPost";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={PostBoard}/>
                        <Route exact path='/add' component={AddPost}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
