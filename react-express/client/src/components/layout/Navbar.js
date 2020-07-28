import React from 'react';
import {Link} from 'react-router-dom'

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5" data-target="#">
            <div className="container">
                <Link to = '/' className="navbar-brand">
                    Blog Website
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
                        <span className="navbar-toggler-icon">

                        </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMain">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/' className = "nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/add' className="btn btn-success">
                                Add Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/' className="btn btn-info ml-2">
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

        </nav>
    );
}

export default Navbar;