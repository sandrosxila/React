import React, {Component} from 'react';
import classnames from "classnames";

class Alert extends Component {
    render() {
        const {message, messageType} = this.props;
        return (
            <div className = {
                classnames(
                    'alert',
                    {
                        'alert-danger': messageType === 'error',
                        'alert-success': messageType === 'success'
                    }
                )
            }>
                {message}
            </div>
        );
    }
}

export default Alert;