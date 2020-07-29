import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setUserData} from "../../slices/auth/authSlice";

import axios from 'axios';

const LogIn = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [response, setResponse] = useState({message:""});

    useEffect(() => {
        if(response.message === "Credentials Match."){
            console.log(response);
            dispatch(setUserData(response.userData));
            history.push('/');
        }
    },[response]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/users/login', credentials);
        setResponse(res.data);
    }



    const onChange = (e) => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const {email, password} = credentials;
    const {message} = response;

    return (
        <div className="row">
            <div className="col col-6 mx-auto">
                <div className="card">
                    <div className="card-title display-4 m-1">
                        <i className="fa fa-user" aria-hidden="true">
                        </i>
                        {' '}
                        Log In
                    </div>
                    <hr className="col-9 mx-auto"/>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input name="email" value={email} type="email" className="form-control"
                                       placeholder="Enter email" onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <input name="password" value={password} type="password" className="form-control"
                                       placeholder="Enter Password" onChange={onChange}/>
                            </div>
                            {
                                (message !== "Credentials Match." && message !== "") &&
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                            }
                            <button type="submit" className="btn btn-primary mx-auto">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
