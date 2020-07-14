import React,{Component} from "react";
import axios from 'axios';
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
        contacts:[],
        dispatch: (action) => {
            this.setState(this.reducer(this.state,action));
        }
    }
    componentDidMount(){
        if(this.state.contacts.length === 0) {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    console.log(res);
                    this.setState({contacts: res.data});
                });
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