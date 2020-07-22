import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import classnames from 'classnames';

import Spinner from '../layout/Spinner';

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: '',
        showDeleteMessage: false
    }

    onChange = e => {
        this.setState({[e.target.name] : e.target.value});
    }

    balanceSubmit = e => {
        e.preventDefault();

        const {client,firestore} = this.props;

        const {balanceUpdateAmount} = this.state;

        const clientUpdate = {
            balance : parseFloat(balanceUpdateAmount)
        }

        firestore.update({collection:'clients', doc: client.id}, clientUpdate);
    }

    onDeleteClick = (e) => {
        const {client,firestore,history} = this.props;

        firestore.delete({collection:'clients', doc: client.id}).then(
            () => {
                history.push('/');
            }
        )
    };

    render() {
        const {client} = this.props;
        let balanceForm = null;
        if (this.state.showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input type="number" className='form-control' name = "balanceUpdateAmount" value={this.state.balanceUpdateAmount} onChange={this.onChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            )
        }
        let deleteMessage = null;
        if (this.state.showDeleteMessage) {
            deleteMessage = (
                <>
                    <div id="overlay" style={
                        {
                            position: 'fixed',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: '2',
                            cursor: 'pointer'
                        }
                    } onClick={() => {
                        this.setState({showDeleteMessage: !this.state.showDeleteMessage});
                    }}>
                    </div>
                    <div style={
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            zIndex: '2'
                        }
                    }>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    Are you sure about deleting the Client?
                                </div>
                                <div className="card-body">
                                    <div className="btn-group pull-left">
                                        <button className="btn btn-danger" onClick={this.onDeleteClick}>
                                            Yes, I'm Sure
                                        </button>
                                    </div>
                                    <div className="btn-group pull-right">
                                        <button className="btn btn-outline-success" onClick={() => {
                                            this.setState({showDeleteMessage: !this.state.showDeleteMessage});
                                        }}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        // console.log(client);
        if (client) {
            const {id, firstName, lastName, email, phone, balance} = client;
            return (
                <div>
                    {deleteMessage}
                    <div className="row">
                        <div className="col">
                            <Link to='/' className='btn-outline-info d-inline-block align-middle border-0 m-2'>
                                <i className="fa fa-arrow-left"/>
                                {' '}
                                Get Back to Dashboard
                            </Link>
                        </div>
                        <div className="col">
                            <div className="btn-group float-right">
                                <Link to={`./edit/${id}`} className="btn btn-dark">
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={
                                    () => {
                                        this.setState({showDeleteMessage: !this.state.showDeleteMessage});
                                    }
                                }>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">

                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h3>{firstName} {lastName}</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-7">
                                            <h4 className="font-weight-bold">
                                                <span>Client ID:</span>
                                                <span className="text-secondary"> {id}</span>
                                            </h4>
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col">
                                                    <h3 className="pull-right">
                                                        <span className="font-weight-bold">Balance:</span>
                                                        <span className={classnames({
                                                            "text-danger": balance > 0,
                                                            "text-success": balance <= 0
                                                        })}> ${parseFloat(balance).toFixed(2)}</span>
                                                        {' '}
                                                        <a href="#!" role="button" onClick={
                                                            (e) => {
                                                                e.preventDefault();
                                                                this.setState({showBalanceUpdate: !this.state.showBalanceUpdate});
                                                            }
                                                        }>
                                                            <i className="fa fa-pencil text-primary "
                                                               aria-hidden="true"/>
                                                        </a>
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-3">

                                                </div>
                                                <div className="col-9">
                                                    {balanceForm}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="list-group">
                                        <div className="list-group-item">
                                            <p style={{width: '6.8rem', display: 'inline-block'}}>Contact Email:</p>
                                            <span> {email}</span>
                                        </div>
                                        <div className="list-group-item">
                                            <p style={{width: '6.8rem', display: 'inline-block'}}>Contact Phone:</p>
                                            <span> {phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
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
        ({firestore: {ordered}}, props) => ({
            client: ordered.client && ordered.client[0]
        })
    )
)(ClientDetails);