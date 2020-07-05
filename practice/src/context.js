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
            default:
                return state;
        }
    }
    state = {
        contacts:[
            {
                id:1,
                name:'Sandro',
                lastName: 'Skhirtladze',
                phone: '558 552 557'
            },
            {
                id:2,
                name:'Sandra',
                lastName: 'Bauer',
                phone: '552 552 557'
            },
            {
                id:3,
                name:'Nick',
                lastName: 'Patrick',
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