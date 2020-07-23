import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import notifyUser from "../../actions/notifyActions";

class AppNavbar extends Component {
    state = {
        isAuthenticated: false
    }
    onLogoutClick = (e) => {
        e.preventDefault();

        const {firebase,notifyUser} = this.props;

        firebase.logout().then(() => {
            notifyUser(null,null);
        });
    };

    static getDerivedStateFromProps(props, state) {
        const {auth} = props;
        if (auth.uid) {
            return {isAuthenticated: true};
        }
        return {isAuthenticated: false};
    }

    render() {
        const {isAuthenticated} = this.state;
        const {auth} = this.props;
        const {allowRegistration} = this.props.settings;
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to='/' className="navbar-brand">
                        ClientPanel
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
                        <span className="navbar-toggler-icon">

                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        {isAuthenticated ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                            : null
                        }

                        {isAuthenticated ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/settings' className="nav-link">
                                        Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="#!" className={"nav-link text-light"}>
                                        {auth.email}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-light text-primary ml-2" onClick={this.onLogoutClick}>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                            : null
                        }
                        { allowRegistration && !isAuthenticated?
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link" onClick={() => {
                                        this.props.notifyUser(null,null);
                                    }}>
                                        Log In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/register' className="nav-link" onClick={() => {
                                        this.props.notifyUser(null,null);
                                    }}>
                                        Register
                                    </Link>
                                </li>
                            </div>
                            :null
                        }

                    </div>

                </div>
            </nav>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect(
        (state, props) => ({
            auth: state.firebase.auth,
            notify : state.notify,
            settings : state.settings
        }),
        {notifyUser}

    )
)(AppNavbar);