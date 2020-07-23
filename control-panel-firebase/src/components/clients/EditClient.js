import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import Spinner from "../layout/Spinner";


class EditClient extends Component {
    constructor(props){
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {firestore, client, history} = this.props;

        const updatedClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value.trim() === ''? 0 : this.balanceInput.current.value
        }
        console.log(client);
        firestore.update({collection:'clients',doc:client.id},updatedClient).then(
            () => {
                history.push('/')
            }
        )
    }
    render() {
        const {client} = this.props;
        const {disableBalanceOnEdit} = this.props.settings;
        if(client){
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
                                    Edit Client
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
                                                ref={this.firstNameInput}
                                                defaultValue={client.firstName}
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
                                                ref={this.lastNameInput}
                                                defaultValue={client.lastName}
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
                                                ref={this.emailInput}
                                                defaultValue={client.email}
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
                                                ref={this.phoneInput}
                                                defaultValue={client.phone}
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
                                                ref={this.balanceInput}
                                                defaultValue={client.balance}
                                                disabled={disableBalanceOnEdit}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary">Edit Client</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Spinner/>
                </div>
            )
        }

    }
}

export default compose(
    firestoreConnect((props) => [{
        collection: 'clients',
        storeAs: 'client',
        doc: props.match.params.id
    }]),
    connect(
        ({firestore: {ordered},settings}, props) => ({
            client: ordered.client && ordered.client[0],
            settings: settings
        })
    )
)(EditClient);