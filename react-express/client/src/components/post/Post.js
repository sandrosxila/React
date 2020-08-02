import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from 'axios';
import {Link,useHistory} from "react-router-dom";

const Post = (props) => {
    const history = useHistory();

    const urlUserId = props.match.params.userId;
    const urlPostId = props.match.params.postId;

    const userData = useSelector(state => state.auth.userData);

    const [postData, setPostData] = useState('');

    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const [alertMessage, setAlertMessage] = useState(false);

    useEffect(() => {
        axios.get(`/posts/${urlPostId}`)
            .then(
                res => {
                    setPostData(res.data);
                }
            )
    }, [setPostData]);

    const {title, image, content, postId, userId} = postData;

    const onDeleteClick = (e) => {
        axios.delete(`/posts/${postId}`)
            .then(res => {
                console.log("IMAGE NAME",image);
                if(image !== undefined && image!==null){
                    axios.delete(`/images/remove/${image}`)
                        .then(res=>{
                            history.push('/');
                            console.log('SUCCESS DELETE');
                        })
                        .catch(err => {
                            console.log('image is not deleted');
                            console.log(err);
                            setAlertMessage(true);
                        });
                }
                else history.push('/');
            })
            .catch( (err) => {
                console.log("FAILED TO DELETE");
                    setAlertMessage(true);
                }
            )
    }

    const deleteMessage = (
        <>
            <div id="overlay" style={
                {
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: '2',
                    cursor: 'pointer'
                }
            } onClick={() => {
                setShowDeleteMessage(!showDeleteMessage);
            }}>
            </div>
            <div style={
                {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    zIndex: '2'
                }
            }>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            Are you sure about deleting the Client?
                        </div>
                        <div className="card-body">
                            <div className="btn-group pull-left">
                                <button className="btn btn-danger" onClick={onDeleteClick}>
                                    Yes, I'm Sure
                                </button>
                            </div>
                            <div className="btn-group pull-right">
                                <button className="btn btn-outline-success" onClick={() => {
                                    setShowDeleteMessage(!showDeleteMessage);
                                }}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            {showDeleteMessage && deleteMessage}
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
                                        }} onClick={() => {
                                            setShowDeleteMessage(true);
                                        }}/>
                                    </div>
                                }

                            </div>

                        </div>
                        {
                            alertMessage &&
                            <div className="alert alert-danger" role="alert">
                                Something went wrong during the process of deletion.
                            </div>
                        }
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
        </>
    );
};

export default Post;
