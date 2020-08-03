import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';

const UserIsLoggedIn = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return (

        <Route {...rest} render={
            (props) => (
                isLoggedIn ?
                    <Component {...props}/>
                    : <Redirect to = '/login'/>
            )
        }/>
    )
};

UserIsLoggedIn.propTypes = {
    component: PropTypes.any.isRequired
}

export default UserIsLoggedIn;
