import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputField = ({type, placeholder, fieldName, name, value, onChange, error}) => {
    // this.onChange = (e) => {
    //     // console.log(e.target.name);
    //     console.log(e);
    // }
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text justify-content-md-center" id="inputGroup-sizing-default"
                      style={{minWidth: '100px'}}>{fieldName}</span>
            </div>
            <input type={type} placeholder={placeholder} name={name}
                   className={classnames("form-control", {"is-invalid": error})} value={value}
                   onChange={onChange}/>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

InputField.defaultProps = {
    type: "text"
}

InputField.protoTypes = {
    type: PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}
export default InputField;