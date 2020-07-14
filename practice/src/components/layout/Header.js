import React from 'react';
import {Link} from 'react-router-dom'
const Header = () => {
        return (
            <div style={{marginBottom:'20px'}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Contact List</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <Link to="/" className="nav-link">
                                <i className="fa fa-home" aria-hidden="true">

                                </i>
                                <span className="ml-1">Home</span>
                            </Link>
                            <Link to="/contact/add" className="nav-link">
                                <i className="fa fa-plus" aria-hidden="true">

                                </i>
                                <span className="ml-1">Create New</span>
                            </Link>
                            <Link to="/About" className="nav-link">
                                <i className="fa fa-question" aria-hidden="true">

                                </i>
                                <span className="ml-1">About</span>
                            </Link>
                        </ul>

                    </div>
                </nav>
            </div>
        );
}

export default Header;