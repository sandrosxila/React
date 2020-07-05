import React, {Component} from 'react';
import Contact from "./Contact";
import {Consumer} from '../context';

class Contacts extends Component {

    deleteHandler = (id) => {
        this.setState({contacts: this.state.contacts.filter(element => id !== element.id)});
    }

    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        let {contacts} = value;
                        return (
                            <div>
                                {
                                    contacts.map(contact => {
                                        let {id, name, lastName, phone} = contact;
                                        return <Contact key={contact.id} id={id} name={name} lastName={lastName} phone={phone}/>
                                    })
                                }
                            </div>
                        );
                    }
                }
            </Consumer>

        );
    }
}

export default Contacts;