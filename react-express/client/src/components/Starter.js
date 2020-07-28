import React, {Component} from 'react';
import axios from 'axios'


class Starter extends Component {
    state = {
        customers : []
    }
    componentDidMount() {
        axios.get('http://localhost:5000/users').then(
            (res) => {
                // console.log(res);
                this.setState({customers : res.data});
            }
        )
        axios.put('http://localhost:5000/users/9',{lastName:'Morrison'}
            ).then(
            (res) => {
                this.setState({customers : res.data});
            }
        )
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.customers.map(customer => {
                            return (
                                <li key={customer.userId}>{customer.firstName} {customer.lastName}</li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Starter;