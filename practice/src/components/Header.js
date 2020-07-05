import React from 'react'
const Header = () => {
        return (
            <div style={{marginBottom:'20px'}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Contact List</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        );
}

export default Header;