import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {v4 as uuid} from "uuid";

const EditPost = (props) => {

    const urlPostId = props.match.params.postId;
    const userData = useSelector(state => state.auth.userData);
    const [postData, setPostData] = useState({});
    const history = useHistory();

    const titleRef = useRef(null);
    const textRef = useRef(null);

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileUrlName, setFileUrlName] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [newImageUploaded, setNewImageUploaded] = useState(false);

    useEffect(() => {
        axios.get(`/posts/${urlPostId}`)
            .then(
                res => {
                    setPostData(res.data);
                    const {image, content, title} = res.data;
                    titleRef.current.value = title;
                    textRef.current.value = content;
                    setFileUrlName(`/images/${image}`);
                }
            )
            .catch(
                err => {
                    history.push('/');
                }
            )
    }, [setPostData, setFileUrlName]);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(newImageUploaded){
            const newFileName = uuid() + '.' + fileName.split('.').pop();
            formData.append('file', file, newFileName);
        }
        else {
            formData.append('file', '');
        }
        formData.append('title', titleRef.current.value);
        formData.append('content', textRef.current.value);
        formData.append('userId', userData.userId);
        formData.append('prevImage', postData.image);

        axios.put(`/posts/${urlPostId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setAlertMessage(null);
                history.push('/');
            })
            .catch((err) => {
                setAlertMessage('Unable To Edit Post')
            });
    }

    const onFileInputChange = (e) => {
        setNewImageUploaded(true);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setFileUrlName(URL.createObjectURL(e.target.files[0]));
    }

    const onImageDeleteClick = (e) => {
        setNewImageUploaded(false);
        axios.delete(fileUrlName)
            .then(
                res => {
                    console.log("deleted");
                    setFileUrlName('');
                }
            )
            .catch(
                err => {
                    console.log("file is not deleted")
                }
            )
    }
    return (
        <div>
            {
                userData.userId === postData.userId &&
                <div>

                    <div className="row mb-2">
                        <div className="col col-12">
                            <div className="card p-3">
                                <h3 className="card-title mb-2">Edit Post</h3>
                                <hr className="col col-3 mx-auto my-0"/>
                                <div className="card-body mt-0">
                                    <form onSubmit={onSubmit} encType="multipart/form-data">
                                        <div className="form-group mb-2">
                                            <input type="text" className="form-control" id="postTitle" ref={titleRef}
                                                   placeholder="Enter Post Title" required/>
                                        </div>
                                        <div className="form-group mb-1">
                                            <label htmlFor="postText"><h5>Type text below</h5></label>
                                            <textarea className="form-control overflow-auto" id="postText" rows="10"
                                                      ref={textRef} required>
                                    </textarea>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Upload</span>
                                            </div>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="postImage"
                                                       onChange={onFileInputChange}/>
                                                <label className="custom-file-label" htmlFor="postImage">
                                                    {fileName}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="card p-4 mb-2">
                                            <i className="fa fa-times" style={{
                                                color: 'red',
                                                display: 'block',
                                                marginTop: '0.2rem',
                                                fontSize: '1.8rem',
                                                cursor: "pointer",
                                                position: "absolute",
                                                right: "1rem",
                                                top: "0.5rem"
                                            }} onClick={onImageDeleteClick}/>
                                            <img className="m-auto" style={{maxWidth: '95%'}} src={fileUrlName}
                                                 alt="No Image"/>
                                        </div>
                                        {
                                            alertMessage ?
                                                <div className="alert alert-danger" role="alert">
                                                    {alertMessage}
                                                </div>
                                                : null
                                        }
                                        <input type="submit" className="btn btn-success" value="Edit!!!"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export default EditPost;
