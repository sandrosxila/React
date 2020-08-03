import React, {Component} from 'react';
import Contact from "../Contact";
import {Consumer} from '../../context';

class Contacts extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value) => {
                        let {contacts} = value;
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
            </Consumer>

        );
    }
}

export default Contacts;