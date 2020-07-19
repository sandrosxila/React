import React, {Component} from 'react';
import InputField from "../InputField";
import {connect} from "react-redux";
import {addContact} from "../../actions/contactActions";

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {},
    }
    validateFields = () => {
        let {name, email, phone} = this.state;
        let errors = {};
        let isValid = true;
        if (name === '') {
            errors.name = 'Name Can\'t Be Empty';
            isValid = false;
        }
        if (email === '') {
            errors.email = 'Last Name Can\'t Be Empty';
            isValid = false;
        }
        if (phone === '') {
            errors.phone = 'Phone Number Can\'t Be Empty';
            isValid = false;
        }
        // console.log(errors);
        this.setState({errors: errors});
        return isValid;
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.validateFields()) {

            let {name, email, phone} = this.state;

            const newContact = {
                name,
                email,
                phone
            }

            this.props.addContact(newContact);

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
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <h4>Create User</h4>
                        <form onSubmit={this.onSubmit}>
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
                                   value="Add to Contact List"
                                   onChange={this.onChange}/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{addContact})(AddContact);