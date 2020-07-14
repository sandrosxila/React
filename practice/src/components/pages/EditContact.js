import React, {Component} from 'react';
import InputField from "../InputField";
import {Consumer, Context} from '../../context';
import axios from 'axios';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {},
    }

    componentDidMount() {
        try {
            const {id} = this.props.match.params;
            console.log(this.context.contacts);
            const data = this.context.contacts.filter(contact => contact.id == id)[0];
            this.setState({name: data.name, email: data.email, phone: data.phone});
        }
        catch (e) {
            console.log(e);
            const {id} = this.props.match.params;
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(res => {
                    const {data} = res;
                    this.setState({name: data.name, email: data.email, phone: data.phone})
                });
        }

    }

    validateFields = () => {
        let {name, email, phone} = this.state;
        let errors = {};
        let isValid = true;
        // console.log(this.state);
        if (name === '') {
            errors.name = 'Name Can\'t Be Empty';
            isValid = false;
            // console.log(isValid)
        }
        if (email === '') {
            errors.email = 'Last Name Can\'t Be Empty';
            isValid = false;
            // console.log(isValid)

        }
        if (phone === '') {
            errors.phone = 'Phone Number Can\'t Be Empty';
            isValid = false;
            // console.log(isValid)

        }
        // console.log(errors);
        this.setState({errors: errors});
        return isValid;
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (dispatch, e) => {
        e.preventDefault();
        if (this.validateFields()) {

            let {name, email, phone} = this.state;

            const updatedContact = {
                name,
                email,
                phone
            }
            const {id} = this.props.match.params;
            axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact)
                .then(res => {
                    dispatch({type: 'UPDATE_CONTACT', payload: res.data});
                })
            this.setState({
                name: '',
                email: '',
                phone: '',
                errors: {}
            });
            this.props.history.push('/');
        }
    }

    render() {
        let {name, email, phone, errors} = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="container">
                                <div className="card">
                                    <div className="card-body">
                                        <h4>Edit User</h4>
                                        <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                            <InputField placeholder="Please Enter Name" fieldName="Name" name="name"
                                                        value={name}
                                                        onChange={this.onChange} error={errors.name}/>
                                            <InputField placeholder="Please Enter E-mail" fieldName="E-mail"
                                                        name="email"
                                                        value={email} onChange={this.onChange}
                                                        error={errors.email} type="email"/>
                                            <InputField placeholder="Please Enter Phone Number" fieldName="Phone"
                                                        name="phone"
                                                        value={phone} onChange={this.onChange} error={errors.phone}/>
                                            <input type="submit" className="btn btn-outline-success"
                                                   value="Edit Contact"
                                                   onChange={this.onChange}/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}

AddContact.contextType = Context;

export default AddContact;