import React, {useState} from 'react';
import {useSelector} from "react-redux";

const UserPanel = () => {
    const userData = useSelector(state => state.auth.userData);
    const [imageFail, setImageFail] = useState(false);

    const {userId,firstName, lastName, photo} = userData;

    return (
        <div className="card p-5 sticky-top" style={{top:'1.2rem'}}>
            <img style={{width: '7rem', height: '7rem', objectFit: 'cover'}}
                 src={`/photos/${userId}/${photo}`}
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
