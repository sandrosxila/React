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

    return (
        <>
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
                                        }}>
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
