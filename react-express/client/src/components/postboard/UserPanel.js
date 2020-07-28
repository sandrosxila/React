import React, {useEffect, useState} from 'react';
import axios from "axios";

const UserPanel = (props) => {
    const [userData, setUserData] = useState({});
    const [imageFail, setImageFail] = useState(false);

    useEffect(() => {
        axios.get('/users/1')
            .then(
                (res) => {
                    setUserData(res.data);
                }
            );
    }, [setUserData]);

    const {firstName, lastName} = userData;

    return (
        <div className="card p-5 sticky-top" style={{top:'1.2rem'}}>
            <img style={{width: '7rem', height: '7rem', objectFit: 'cover'}}
                 src="/photos/user.png"
                 className="card-img-top mx-auto rounded-circle " alt="" onError={
                (e) => {
                    e.target.style.display = 'none';
                    setImageFail(true);
                }
            }/>

            {imageFail ?
                <i className="fa fa-file-image-o" aria-hidden="true">
                </i>
                : null}
            <div className="card-body">
                <h4 className="card-title">
                    {firstName} {lastName}
                </h4>
            </div>
        </div>
    );
};

export default UserPanel;
