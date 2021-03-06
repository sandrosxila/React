import React, {useEffect, useState} from 'react';

import UserPanel from "./UserPanel";
import RecentPosts from "./RecentPosts";
import UserPosts from './UserPosts';

const PostBoard = () => {

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
        <div>
            <div className="row">
                <div className="col col-3">
                    <UserPanel/>
                </div>
                <div className="col col-6">
                    <RecentPosts/>
                </div>
                <div className="col col-3">
                    <UserPosts/>
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
        </div>
    );
};

export default PostBoard;
