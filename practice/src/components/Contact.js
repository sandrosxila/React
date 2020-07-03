import React from 'react'
import {Component} from 'react'
import {Consumer} from '../context'

class Contact extends Component {
    state = {
        isVisible: false
    }
    clickOnCollapse = () => {
        this.setState({isVisible: !this.state.isVisible});
    }

    render() {
        let {id, name, lastName, phone} = this.props;
        return (
            <Consumer>
                {
                    (value) => {
                        let {dispatch} = value;
                        return (
                            <ul className="card card-body mb-3">
                                <h6>
                                    <i onClick={() => {
                                        dispatch({type: 'DELETE_CONTACT',payload: id});
                                    }} className="fa fa-window-close" aria-hidden="true"
                                       style={{float: 'right', cursor: 'pointer'}}></i>
                                    <i onClick={this.clickOnCollapse} className="fa fa-angle-down"
                                       style={{float: 'left', cursor: 'pointer'}}></i>
                                    {
                                        !this.state.isVisible ?
                                            <p style={{marginLeft: '20px'}}>{name} {lastName}</p> :
                                            null
                                    }
                                </h6>
                                {this.state.isVisible ?
                                    [
                                        <li className="list-group-item list-group-item-action">{name}</li>,
                                        <li className="list-group-item list-group-item-action">{lastName}</li>,
                                        <li className="list-group-item list-group-item-action">{phone}</li>
                                    ]
                                    : null
                                }

                            </ul>
                        );
                    }
                }

            </Consumer>
        );
    }
}

export default Contact;
