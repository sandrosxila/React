import React, {useEffect, useState} from 'react';
import UserInfo from "./UserInfo";
import {useHistory} from 'react-router-dom';
import axios from "axios";
const Posts = (props) => {

    const history = useHistory();
    const {id} = props.match.params;

    const [userData, setUserData] = useState({
        userId : ''
    });

    useEffect(() => {
        axios.get(`/users/${id}`)
            .then( res => {
                setUserData(res.data);
            })
    },[setUserData]);

    useEffect(() => {
        if(userData.userId === undefined)
        {
            history.push('/');
        }
    },[userData])

    return (
        <div className="row">
          <div className="col col-9 mx-auto">
              <UserInfo userData = {userData} />
          </div>
        </div>
    );
};

export default Posts;
