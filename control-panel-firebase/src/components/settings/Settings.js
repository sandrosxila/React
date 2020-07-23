import React, {Component} from 'react';
import {setDisableBalanceOnAdd, setAllowRegistration, setDisableBalanceOnEdit} from '../../actions/settingsActions';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";

class Settings extends Component {
    disableBalanceOnAdd = () => {
        const {setDisableBalanceOnAdd} = this.props;
        setDisableBalanceOnAdd();
    }
    disableBalanceOnEdit = () => {
        const {setDisableBalanceOnEdit} = this.props;
        setDisableBalanceOnEdit();
    }
    allowRegistration = () => {
        const {setAllowRegistration} = this.props;
        setAllowRegistration();
    }

    render() {
        const {disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration} = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Link to='/' className='btn-outline-info'>
                            <i className="fa fa-arrow-left"/>
                            {' '}
                            Get Back to Dashboard
                        </Link>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Edit Settings
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label className="checkbox-group">Allow Registration
                                            <input className="checkbox-group-input" type="checkbox"
                                                   name="allowRegistration" checked={!!allowRegistration}
                                                   onChange={this.allowRegistration}/>
                                            <span className="checkmark">
                                        </span>
                                        </label>

                                    </div>
                                    <div className="form-group">
                                        <label className="checkbox-group">Disable Balance On Add
                                            <input className="checkbox-group-input" type="checkbox"
                                                   name="disableBalanceOnAdd" checked={!!disableBalanceOnAdd}
                                                   onChange={this.disableBalanceOnAdd}/>
                                            <span className="checkmark">
                                        </span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label className="checkbox-group">Disable Balance On Edit
                                            <input className="checkbox-group-input" type="checkbox"
                                                   name="disableBalanceOnEdit" checked={!!disableBalanceOnEdit}
                                                   onChange={this.disableBalanceOnEdit}/>
                                            <span className="checkmark">
                                        </span>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        settings: state.settings
    }),
    {setDisableBalanceOnAdd, setAllowRegistration, setDisableBalanceOnEdit}
)(Settings);