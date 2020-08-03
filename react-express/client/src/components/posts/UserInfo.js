import React from 'react';

const UserInfo = (props) => {

    const {userData} = props;
    const {userId,photo,firstName,lastName} = userData;
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col col-3">
                        <img style={{width: '9rem', height: '9rem', objectFit: 'cover'}}
                             src={`/photos/${userId}/${photo}`}
                             className="mx-auto rounded-circle" alt="No Image"/>
                    </div>
                    <div className="col col-9">
                        <h4>Posts of</h4>
                        <p className="display-3">{firstName} {lastName}</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UserInfo;
