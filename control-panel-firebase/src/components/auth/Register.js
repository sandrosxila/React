import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase';
import notifyUser from '../../actions/notifyActions';
import Alert from '../layout/Alert';

class Register extends Component {
    state = {
        email: '',
        repeatEmail:'',
        password: '',
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    validateEmailFields = () => {
        const {email,repeatEmail} = this.state;
        return email === repeatEmail;
    }

    onSubmit = e => {
        e.preventDefault();
        const {firebase, notifyUser,history} = this.props;
        const {email, password} = this.state;
        if(this.validateEmailFields()){
            firebase.createUser({
                email,
                password
            })
                .then(() => {
                    notifyUser('successfully Registered!!!','success');
                    history.push('/login')
                })
                .catch((err) => {
                    console.log(err);
                    notifyUser('That User Already Exists','error');
                })
        }
        else{
            notifyUser('Repeated Email does not match','error');
        }

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
                                    <i className="fa fa-id-card"/>
                                    {' '}
                                    <span className="text-dark"> Register </span>
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
                                        <label htmlFor="repeatEmail">Repeat E-mail</label>
                                        <input type="email" id="repeatEmail" className="form-control"
                                               placeholder="Enter E-mail"
                                               name="repeatEmail" value={this.state.repeatEmail}
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
                                                Register
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
        (state,props) => ({
            notify: state.notify
        }),
        {notifyUser}
    )
)(Register);