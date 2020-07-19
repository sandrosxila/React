import {ADD_CONTACT, DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT, GET_CONTACT} from "../actions/types";

const initialState = {
    contacts: [],
    contact: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTACTS:
            if(state.contacts.length !== 0){
                return {
                    ...state,
                }
            }
            return {
                ...state,
                contacts: action.payload
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    action.payload
                ],
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.id == action.payload.id) {
                        return action.payload;
                    }
                    return contact;
                })
            }
        case GET_CONTACT:
            return {
                ...state,
                contact: action.payload
            }
        default:
            return state;
    }
}