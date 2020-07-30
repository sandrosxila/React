import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";

import UserInfo from "./UserInfo";
import PersonalPostBoard from "./PersonalPostBoard";

const Posts = (props) => {

    const history = useHistory();
    const {userId} = props.match.params;

    const [userData, setUserData] = useState({
        userId : ''
    });

    useEffect(() => {
        axios.get(`/users/${userId}`)
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

    const [scrollPosition,setScrollPosition] = useState(0);

    const scrollSet = () => {
        setScrollPosition(window.scrollY);
    };
    useEffect(()=>{
        window.addEventListener('scroll', scrollSet);
        return () => {
            window.removeEventListener('scroll', scrollSet);
            setScrollPosition(0);
        }
    },[setScrollPosition]);


    return (
        <>
        <div className="row">
          <div className="col col-9 mx-auto">
              <UserInfo userData = {userData} />
          </div>
        </div>
        <div className="row">
            <div className="col col-6 mx-auto">
                <PersonalPostBoard idInUrl={userId}/>
            </div>
        </div>
            {
                scrollPosition > 60 ?
                    <a href="#" style={{position:'fixed',bottom:'25px',right:'25px'}} className="btn btn-light btn-lg">
                        <i className="fa fa-chevron-up">
                        </i>
                    </a>
                    :null
            }
        </>
    );
};

export default Posts;
