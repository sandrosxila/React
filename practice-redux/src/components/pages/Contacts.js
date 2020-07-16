import React, {Component} from 'react';
import Contact from "../Contact";
import {connect} from 'react-redux';
import {GET_CONTACTS} from "../../actions/types";


class Contacts extends Component {
    componentDidMount(){
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

const fromReducerStateToProps = (state) => ({
    contacts : state.contact.contacts
});
const fromReducerDispatchToProps = (dispatch) => ({
    getContacts : () => dispatch({type:GET_CONTACTS})
});

export default connect(fromReducerStateToProps,fromReducerDispatchToProps)(Contacts);