import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUserData} from "../../slices/auth/authSlice";
import PasswordStrengthBar from 'react-password-strength-bar';
import axios from "axios";
import {v4 as uuid} from "uuid";

const SignUp = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [acceptPassword,setAcceptPassword] = useState(true);
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: ''
    });


    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileUrlName, setFileUrlName] = useState('');
    const [newImageUploaded, setNewImageUploaded] = useState(false);

    const [response, setResponse] = useState({message: ""});

    const {firstName, lastName, email, password, repeatedPassword} = credentials;
    const {message} = response;

    useEffect(() => {
        if (response.message === "data added successfully!!!") {
            console.log(response);
            dispatch(setUserData(response.userData));
            history.push('/');
        }
    }, [response]);

    const validateData = () => {
        return repeatedPassword===password && acceptPassword;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('email',email)
        formData.append('password',password);

        // formData.append('firstName',"Nick");
        // formData.append('lastName',"Cage");
        // formData.append('email','nc@gmail.com');
        // formData.append('password',"donjoe123");
        if(newImageUploaded){
            const newFileName = uuid() + '.' + fileName.split('.').pop();
            formData.append('file', file, newFileName);
            formData.append('photo',newFileName);
        }
        console.log(formData);
        if(validateData()) {
            const res = axios.post('/users/signup', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( (res) => {
                setResponse(res.data);
            } );
        }
        else{
            setResponse({message: 'Password is not Strong Enough!!!'})
        }
    }


    const onChange = (e) => {
        e.preventDefault();
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onFileInputChange = (e) => {
        setNewImageUploaded(true);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setFileUrlName(URL.createObjectURL(e.target.files[0]));
    }

    const onImageDeleteClick = (e) => {
        setNewImageUploaded(false);
        setFileUrlName('');
    }



    return (
        <div className="row">
            <div className="col col-6 mx-auto">
                <div className="card">
                    <div className="card-title display-4 m-1">
                        <i className="fa fa-user-plus" aria-hidden="true">
                        </i>
                        {' '}
                        Sign Up
                    </div>
                    <hr className="col-9 mx-auto"/>
                    <div className="card-body">
                        <form onSubmit={onSubmit} encType="multipart/form-data">
                            <div className="form-group">
                                <input name="firstName" value={firstName} type="text" className="form-control"
                                       placeholder="Enter First Name" onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <input name="lastName" value={lastName} type="text" className="form-control"
                                       placeholder="Enter Last Name" onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <input name="email" value={email} type="email" className="form-control"
                                       placeholder="Enter email" onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <input name="password" value={password} type="password" className="form-control"
                                       placeholder="Enter Password" onChange={onChange}/>
                            <PasswordStrengthBar password={password}
                                                    onChangeScore = {
                                                        (score) => {
                                                            if(score > 1)
                                                                setAcceptPassword(true);
                                                            else
                                                                setAcceptPassword(false);
                                                        }
                                                    }
                            />
                            </div>
                            <div className="form-group">
                                <input name="repeatedPassword" value={repeatedPassword} type="password"
                                       className="form-control"
                                       placeholder="Repeat Password" onChange={onChange}/>
                                {
                                    repeatedPassword === password ?
                                        <div className="invalid-feedback">
                                            Passwords Don't Match
                                        </div>
                                        :
                                        <div className="valid-feedback">
                                            Passwords Match
                                        </div>
                                }

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
                                (message !== "data added successfully!!!" && message !== "") &&
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            }
                            <button type="submit" className="btn btn-primary mx-auto">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
