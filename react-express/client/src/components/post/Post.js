import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from 'axios';
import {Link} from "react-router-dom";

const Post = (props) => {
    const urlUserId = props.match.params.userId;
    const urlPostId = props.match.params.postId;

    const userData = useSelector(state => state.auth.userData);

    const [postData, setPostData] = useState('');

    useEffect(() => {
        axios.get(`/posts/${urlPostId}`)
            .then(
                res => {
                    setPostData(res.data);
                }
            )
    }, [setPostData]);

    const {title, image, content, postId, userId} = postData;


    return (
        <div className="row">
            <div className="col col-12">
                <div className="card">
                    <div className="card-title pt-3 px-4">
                        <div className="row">
                            <h1 className="col col-10">
                                {title}
                            </h1>
                            {
                                userId == urlUserId && urlUserId == userData.userId &&
                                <div className="col col-2 px-5">
                                    <Link to={`/edit/${postId}`}>
                                        <i className="fa fa-pencil float-left"
                                           style={{
                                               color: 'black',
                                               display: "inline-block",
                                               fontSize: "2rem",
                                               marginTop: "0.3rem",
                                               cursor: "pointer"
                                           }}/>
                                    </Link>
                                    <i className="fa fa-times float-right" style={{
                                        color: 'red',
                                        display: "inline-block",
                                        fontSize: "2.5rem",
                                        cursor: "pointer"
                                    }}/>
                                </div>
                            }

                        </div>

                    </div>
                    <hr className="m-0"/>
                    <div className="card-body">
                        <div className="card image-wrapper float-right mx-4 mb-4">
                            <img className="m-auto" style={{maxWidth: '100%'}} src={`/images/${image}`} alt=""/>
                        </div>

                        <div className="text-justify single-post-content-wrapper p-3">
                            {
                                content &&
                                content.split('\n').map((line, idx) => {
                                    return (
                                        <p key={idx}>
                                            {line}
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
