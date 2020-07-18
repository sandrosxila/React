import React, {Component} from 'react';
import Contact from "../Contact";
import {connect} from 'react-redux';
import {getContacts} from "../../actions/contactActions";

class Contacts extends Component {
    componentDidMount() {
        this.props.getContacts();
    }

    render() {
        let {contacts} = this.props;
        return (
            <div style={{marginTop: "20px"}} className="container">
                {
                    contacts.map(contact => {
                        let {id, name, email, phone} = contact;
                        return <Contact key={contact.id} id={id} name={name} email={email} phone={phone}/>
                    })
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contact.contacts
});


export default connect(mapStateToProps, {getContacts})(Contacts);