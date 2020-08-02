import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import FadeIn from "react-fade-in";

const PersonalPostBoard = (props) => {

    const [posts, setPosts] = useState([]);
    const {userId} = useSelector(state => state.auth.userData);
    const [showButtons, setShowButtons] = useState(false);
    const [indexOfButtons, setIndexOfButtons] = useState(-1);
    useEffect(() => {
        axios.get(`/users/${props.idInUrl}/posts`)
            .then(res => {
                setPosts(res.data);
            })
    }, [setPosts])

    const onMouserEnter = (index, e) => {
        setIndexOfButtons(index);
        setShowButtons(true);
    }

    const onMouseLeave = (e) => {
        setIndexOfButtons(-1);
        setShowButtons(false);
    }

    const [showDeleteMessage, setShowDeleteMessage] = useState(false);

    const onDeleteClick = (postId,image,e) => {
        axios.delete(`/posts/${postId}`)
            .then(res => {
                console.log("IMAGE NAME",image);
                if(image !== undefined && image!==null){
                    axios.delete(`/images/remove/${image}`)
                        .then(res=>{
                            axios.get(`/users/${props.idInUrl}/posts`)
                                .then(res => {
                                    setPosts(res.data);
                                });
                        })
                        .catch(err => {
                            console.log('image is not deleted');
                            console.log(err);
                        });
                }
                else {
                    axios.get(`/users/${props.idInUrl}/posts`)
                        .then(res => {
                            setPosts(res.data);
                        })
                }
            })
            .catch( (err) => {
                    console.log("FAILED TO DELETE");
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
            {
                posts.map(post => {
                    const {title, image, content, postId} = post;
                    return (
                        <div key={postId} className="card mb-4" onMouseEnter={onMouserEnter.bind(this, postId)}
                             onMouseLeave={onMouseLeave}>
                            {
                                (userId == props.idInUrl && postId === indexOfButtons && showButtons) &&
                                <FadeIn>
                                    <div style={{
                                        position: 'absolute',
                                        right: '0',
                                        transform: 'translate(100%,10%)',
                                        // backgroundColor: 'green',
                                        paddingRight: '0.7rem',
                                        paddingLeft: '0.7rem',
                                        paddingBottom: '0.7rem'
                                    }}>
                                        <Link to={`/edit/${postId}`}>
                                            <i className="fa fa-pencil"
                                               style={{
                                                   color: 'black',
                                                   display: 'block',
                                                   fontSize: '1.7rem',
                                                   cursor: "pointer"
                                               }}>
                                            </i>
                                        </Link>

                                        <i className="fa fa-times" style={{
                                            color: 'red',
                                            display: 'block',
                                            marginTop: '0.2rem',
                                            fontSize: '1.8rem',
                                            cursor: "pointer"
                                        }} onClick={
                                            onDeleteClick.bind(this,postId,image)
                                        }>
                                        </i>
                                    </div>
                                </FadeIn>
                            }
                            <img src={`/images/${image}`} alt="Loading ..." className="card-img-top"
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
                                <Link to={`/${props.idInUrl}/posts/${postId}`} className="btn btn-outline-dark m-2">
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

export default PersonalPostBoard;
