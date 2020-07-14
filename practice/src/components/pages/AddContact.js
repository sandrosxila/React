import React, {Component} from 'react';
import InputField from "../InputField";
import {Consumer} from '../../context';
import {v4 as uuid} from 'uuid';

class AddContact extends Component {
    state = {
        name: '',
        lastName: '',
        phone: '',
        errors: {},
    }
    validateFields = () => {
        let {name,lastName,phone} = this.state;
        let errors = {};
        let isValid = true;
        // console.log(this.state);
        if (name === '') {
            errors.name = 'Name Can\'t Be Empty';
            isValid = false;
            console.log(isValid)
        }
        if (lastName === '') {
            errors.lastName = 'Last Name Can\'t Be Empty';
            isValid = false;
            console.log(isValid)

        }
        if (phone === '') {
            errors.phone = 'Phone Number Can\'t Be Empty';
            isValid = false;
            console.log(isValid)

        }
        // console.log(errors);
        this.setState({errors:errors});
        return isValid;
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (dispatch, e) => {
        e.preventDefault();
        if(this.validateFields()) {

            let {name, lastName, phone} = this.state;

            const newContact = {
                id: uuid(),
                name,
                lastName,
                phone
            }
            dispatch({type: 'ADD_CONTACT', payload: newContact});
            this.setState({
                name: '',
                lastName: '',
                phone: '',
                errors: {}
            });
            this.props.history.push('/');
        }
    }

    render() {
        let {name, lastName, phone, errors} = this.state;
        return (
            <Consumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                            <div className="container">
                                <div className="card">
                                    <div className="card-body">
                                        <h4>Create User</h4>
                                        <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                            <InputField placeholder="Please Enter Name" fieldName="Name" name="name"
                                                        value={name}
                                                        onChange={this.onChange} error={errors.name}/>
                                            <InputField placeholder="Please Enter Last Name" fieldName="Last Name"
                                                        name="lastName"
                                                        value={lastName} onChange={this.onChange}
                                                        error={errors.lastName}/>
                                            <InputField placeholder="Please Enter Phone Number" fieldName="Phone"
                                                        name="phone"
                                                        value={phone} onChange={this.onChange} error={errors.phone}/>
                                            <input type="submit" className="btn btn-outline-success"
                                                   value="Add to Contact List"
                                                   onChange={this.onChange} />
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

export default AddContact;