import React from 'react';
import classnames from 'classnames';

const InputField = ({type, placeholder, fieldName, name, value, onChange, error}) => {
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
export default InputField;