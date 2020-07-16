import React, {Component} from 'react';
import Contact from "../Contact";

class Contacts extends Component {
    state = {
        contacts: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@gmail.com',
                phone: '555-555-5555'
            },
            {
                id: 2,
                name: 'Karen Williams',
                email: 'karen@gmail.com',
                phone: '444-444-4444'
            },
            {
                id: 3,
                name: 'Henry Johnson',
                email: 'henry@gmail.com',
                phone: '333-333-333'
            }
        ]
    };

    render() {
        let {contacts} = this.state;
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

export default Contacts;