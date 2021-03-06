import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import notifyUser from '../../actions/notifyActions';
import Alert from '../layout/Alert';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();
        const {firebase, notifyUser} = this.props;
        const {email, password} = this.state;
        firebase.login({
            email,
            password
        })
            .then(() => {
                notifyUser('successfully Logged in!!!','success');
            })
            .catch((err) => {
                console.log(err);
                notifyUser('Username or Password is incorrect!!!','error');
            })
    }

    render() {
        const {message, messageType} = this.props.notify;

        return (
            <div>
                <div className="row">
                    <div className="col-6 mx-auto">
                        <div className="card">
                            <div className="card-title">
                                <h1 className="text-center my-1">
                                    <i className="fa fa-user-circle-o"/>
                                    {' '}
                                    <span className="text-dark"> Login </span>
                                </h1>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit} method="post">
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email" id="email" className="form-control"
                                               placeholder="Enter E-mail"
                                               name="email" value={this.state.email}
                                               onChange={this.onChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" className="form-control"
                                               placeholder="Enter Password"
                                               name="password" value={this.state.password}
                                               onChange={this.onChange} required/>
                                    </div>
                                    <Alert message={message} messageType={messageType}/>
                                    <div className="row p-2">
                                        <div className="col-4 mx-auto">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect(
        (state,props) => {
            return {
                notify: state.notify
            }
        },
        {notifyUser}
    )
)(Login);