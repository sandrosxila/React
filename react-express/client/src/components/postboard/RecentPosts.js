import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'

const RecentPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('/posts')
            .then((res) => {
                setPosts(res.data);
            });
    }, [setPosts]);

    return (
        <>
            {
                posts.map(post => {
                    const {title, image, content, userId, postId} = post;
                    return (
                        <div key={postId} className="card mb-4">
                            <img src={`images/${image}`} alt="Loading ..." className="card-img-top"
                                 style={{height: '15rem', width: '100%', objectFit: 'cover'}}
                                 onError={
                                     (e) => {
                                         e.target.style.display = 'none';
                                     }
                                 }
                            />
                            <div className="card-body">
                                <h2 className="card-title">
                                    {title}
                                </h2>
                                <div className="card-text">
                                    {content.substr(0, 250)}...
                                </div>
                                <Link to={`${userId}/posts/${postId}`} className="btn btn-outline-dark m-2">
                                    Read More...
                                </Link>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};

export default RecentPosts;
