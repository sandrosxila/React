import React, {Component} from 'react';
import InputField from "../InputField";
import {connect} from "react-redux";
import {getContact,updateContact} from "../../actions/contactActions";

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        errors: {},
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        let {name,email,phone} = nextProps.contact;
        this.setState({
                name,email,phone
            });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getContact(id);
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
    onSubmit = (e) => {
        e.preventDefault();
        if (this.validateFields()) {

            let {name, email, phone} = this.state;

            const updatedContact = {
                name,
                email,
                phone
            }
            const {id} = this.props.match.params;
            this.props.updateContact({...updatedContact,id});
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
                        <h4>Edit User</h4>
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
                                   value="Edit Contact"
                                   onChange={this.onChange}/>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        contact: state.contact.contact
    }
}
export default connect(mapStateToProps, {getContact,updateContact})(AddContact);