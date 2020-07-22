import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Clients extends Component {

    state = {
        totalOwed: 0
    }

    static getDerivedStateFromProps(props, state) {
        const {clients} = props;
        if (clients) {
            const total = clients.reduce((total, client) => total + parseFloat(client.balance.toString()), 0);
            return {totalOwed: total}
        }
        return null;
    }

    render() {
        const {clients} = this.props;
        const {totalOwed} = this.state;
        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col col-md-6">
                            <h2>
                                <i className="fa fa-users"></i>
                                {' '}
                                Clients
                            </h2>
                        </div>
                        <div className="col col-md-6">
                            <h3>total Owed: {parseFloat(totalOwed).toFixed(2)}</h3>
                        </div>
                    </div>
                    <table className="table table-borderless">
                        <thead className="bg-secondary table-dark">
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>balance</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            clients.map(
                                client => {
                                    const {id, firstName, lastName, email, balance} = client;
                                    return (
                                        <tr key={id}>
                                            <td>{firstName}{' '}{lastName}</td>
                                            <td>{email}</td>
                                            <td>{parseFloat(balance).toFixed(2)}</td>
                                            <td className="p-2">
                                                <Link to={`/client/${id}`} className="btn btn-outline-info btn-sm">
                                                    <i className="fa fa-arrow-circle-right"></i> Details
                                                </Link>
                                            </td>

                                        </tr>
                                    )
                                }
                            )
                        }
                        </tbody>
                    </table>
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
    firestoreConnect(() => ['clients']),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);