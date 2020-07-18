import React from 'react';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {deleteContact} from "../actions/contactActions";

class Contact extends Component {
    state = {
        isVisible: false
    }

    clickOnCollapse = () => {
        this.setState({isVisible: !this.state.isVisible});
    }
    onDeleteClick = id => {
        this.props.deleteContact(id);
    }

    render() {
        let {id, name, email, phone} = this.props;
        return (
            <ul className="card card-body mb-3">
                <h6>
                    <i onClick={this.onDeleteClick.bind(this, id)} className="fa fa-window-close"
                       aria-hidden="true"
                       style={{float: 'right', cursor: 'pointer'}}>

                    </i>
                    <Link to={`/contact/edit/${id}`}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"
                           style={{float: 'right', cursor: 'pointer', marginRight: '1rem'}}>
                        </i>
                    </Link>


                    <i onClick={this.clickOnCollapse} className="fa fa-angle-down"
                       style={{float: 'left', cursor: 'pointer'}}>

                    </i>
                    {
                        !this.state.isVisible ?
                            <p style={{marginLeft: '20px'}}>{name}</p> :
                            null
                    }
                </h6>
                {this.state.isVisible ?
                    [
                        <li key={'name'} className="list-group-item list-group-item-action">{name}</li>,
                        <li key={'email'} className="list-group-item list-group-item-action">{email}</li>,
                        <li key={'phone'} className="list-group-item list-group-item-action">{phone}</li>
                    ]
                    : null
                }

            </ul>
        );
    }
}

export default connect(null,{deleteContact})(Contact);
