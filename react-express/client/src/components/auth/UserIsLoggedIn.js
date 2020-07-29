import React from 'react';
import {Route,Redirect} from "react-router-dom";
import {useSelector} from "react-redux";


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

export default UserIsLoggedIn;
