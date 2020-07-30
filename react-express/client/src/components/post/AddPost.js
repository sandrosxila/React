import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {v4 as uuid} from 'uuid';

const AddPost = (props) => {

    const history = useHistory();

    const titleRef = useRef(null);
    const textRef = useRef(null);

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);


    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const newFileName = uuid() + '.' + fileName.split('.').pop();
        try {
            formData.append('file', file, newFileName);
        } catch (e) {
            console.log("image is not uploaded");
        }
        formData.append('title', titleRef.current.value);
        formData.append('content', textRef.current.value);
        formData.append('userId', '1');

        axios.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setAlertMessage(null);
                history.push('/');
            })
            .catch((err) => {
                setAlertMessage('Unable To Add Post')
            });
    }

    const onFileInputChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    return (
        <div>
            <div className="row mb-2">
                <div className="col col-12">
                    <div className="card p-3">
                        <h3 className="card-title mb-2">Add Post</h3>
                        <hr className="col col-3 mx-auto my-0"/>
                        <div className="card-body mt-0">
                            <form onSubmit={onSubmit} encType="multipart/form-data">
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" id="postTitle" ref={titleRef}
                                           placeholder="Enter Post Title" required/>
                                </div>
                                <div className="form-group mb-1">
                                    <label htmlFor="postText"><h5>Type text below</h5></label>
                                    <textarea className="form-control overflow-auto" id="postText" rows="10" ref={textRef} required>
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
                                {
                                    alertMessage ?
                                        <div className="alert alert-danger" role="alert">
                                            {alertMessage}
                                        </div>
                                        : null
                                }
                                <input type="submit" className="btn btn-success" value="Post!!!"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
