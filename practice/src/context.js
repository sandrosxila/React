import React,{Component} from "react";

const Context = React.createContext();

export class Provider extends Component {
    reducer = (state, action) => {
        switch(action.type){
            case 'DELETE_CONTACT':
                return {
                    ...state,
                    contacts: state.contacts.filter( contact => contact.id !== action.payload)
                };
            case 'ADD_CONTACT':
                return {
                    ...state,
                    contacts: [
                        ...state.contacts,
                        action.payload
                    ]
                }
            case 'UPDATE_CONTACT':{
                return {
                    ...state,
                    contacts: state.contacts.map( contact => {
                        if(contact.id === action.payload.id){
                            return action.payload;
                        }
                        return contact;
                    })
                }
            }

            default:
                return state;
        }
    }
    state = {
        contacts:[
            {
                id:'1',
                name:'Sandro Skhirtladze',
                email: 'sandro@yahoo.com',
                phone: '558 552 557'
            },
            {
                id:'2',
                name:'Sandra Bauer',
                email: 'sandra@mercury.at',
                phone: '552 552 557'
            },
            {
                id:'3',
                name:'Nick Patrick',
                email: 'nick@harisson.pl',
                phone: '554 552 557'
            }
        ],
        dispatch: (action) => {
            this.setState(this.reducer(this.state,action));
        }
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {
                    this.props.children
                }
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;

export {Context};