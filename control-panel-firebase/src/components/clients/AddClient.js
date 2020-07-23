import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from "react-redux-firebase";

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault();

        const newClient = this.state;

        if (newClient.balance.trim() === '') {
            newClient.balance = 0;
        }

        const {firestore, history} = this.props;

        firestore.add({collection: 'clients'}, newClient).then(
            () => {
                history.push('/');
            }
        );
    }

    render() {
        const {disableBalanceOnAdd} = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Link to='/' className='btn-outline-info'>
                            <i className="fa fa-arrow-left"/>
                            {' '}
                            Get Back to Dashboard
                        </Link>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Add Client
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="Enter First Name"
                                            minLength="2"
                                            required
                                            onChange={this.onChange}
                                            value={this.state.firstName}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Enter Last Name"
                                            minLength="2"
                                            required
                                            onChange={this.onChange}
                                            value={this.state.lastName}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter E-mail"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            name="phone"
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Enter Phone Number"
                                            minLength="10"
                                            required
                                            onChange={this.onChange}
                                            value={this.state.phone}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="balance">Balance</label>
                                        <input
                                            name="balance"
                                            type="number"
                                            className="form-control"
                                            id="balance"
                                            placeholder="Enter Balance"
                                            onChange={this.onChange}
                                            value={this.state.balance}
                                            disabled = {disableBalanceOnAdd}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Add Client</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    firestoreConnect(),
    connect(
        (state,props) => {
            return {
                settings : state.settings
            }
        }
    )
)(AddClient);