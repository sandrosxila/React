import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

const UserPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/users/1/posts')
            .then(res => {
                setPosts(res.data);
            })
    }, [setPosts])
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h4 className="card-title">
                    Your Recent Posts
                </h4>
                <hr/>
                <div className="card-text">
                    <ul className="list-group">
                        {
                            posts.slice(0,15).map(post => {
                                const {title,postId,userId} = post;
                                return (
                                    <Link key={postId} to={`/${userId}/posts/${postId}`} className="list-group-item">
                                        {title}
                                    </Link>
                                )
                            })
                        }
                    </ul>
                    <Link to={`/1/posts`} className="btn btn-outline-secondary mt-3">
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserPosts;
