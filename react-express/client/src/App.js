import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Navbar from "./components/layout/Navbar";
import PostBoard from "./components/postboard/PostBoard";
import Posts from "./components/posts/Posts";
import AddPost from "./components/add/AddPost";
import LogIn from "./components/auth/LogIn";
import UserIsLoggedIn from "./components/auth/UserIsLoggedIn";
import UserIsNotLoggedIn from "./components/auth/UserIsNotLoggedIn";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <UserIsLoggedIn exact path='/' component={PostBoard}/>
                        <UserIsLoggedIn exact path='/add' component={AddPost}/>
                        <UserIsLoggedIn exact path='/:id/posts' component={Posts}/>
                        <UserIsNotLoggedIn exact path='/login' component={LogIn}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
