import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faTimes, faCoins } from "@fortawesome/free-solid-svg-icons";
import '../UserList.css';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import profile from "../../../assets/img/faces/male_avatar.png";

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;

function FriendInvitation(props) {
    const { invitation, onProccessingInvitation } = props;
    const [isOpen, setIsOpen] = useState(false);
    const { jwtToken, userID } = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        userID: state.auth.userID,
    }));

    // const createdDate = new Date(user.createdDate);

    const history = useHistory();

    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const handleOpenDetail = () => setIsOpen(!isOpen);

    return (
        <>
            {isOpen ?
                <div className="card">
                    <Button variant='link' className="btn-close" onClick={handleOpenDetail}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </Button>
                    <div className="top-container">
                        <img src={profile} className="img-fluid profile-image" width="70" />
                        <div className="ml-3">
                            <h5 className="name">{invitation.fromUser}</h5>
                            <p className="mail">{invitation.fromUser_email}</p>
                            {/* <p>Join Date: {createdDate.toLocaleDateString()}</p> */}
                        </div>
                    </div>

                    <div style={{ fontWeight: 'bold' }}>COIN:  &nbsp;
                            <div className="amount" style={{ display: 'inline' }}>
                            {invitation.fromUser_xu} &nbsp;
                                <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>ELO:  &nbsp;
                            <div className="amount" style={{ display: 'inline' }}>
                            {invitation.fromUser_elo} &nbsp;
                                <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
                        </div>
                    </div>



                    <div className="bottom-container">
                        <p>Đã gửi lời mời kết bạn lúc:</p>
                        <p>{invitation.time}</p>
                        {/* <p>matches: {user.matches.length}</p>
                        <p>wins: {user.winningGame.length}</p> */}
                    </div>
                    <div className="bottom-container">
                        <Button variant="success" className="buttom-btn" onClick={(e) => onProccessingInvitation(e, invitation._id, true)}>Accept</Button>
                        <Button variant="danger" className="bottm-btn" onClick={(e) => onProccessingInvitation(e, false)}>Cancel</Button>
                    </div>
                </div>
                : <div className="table-item">
                    <div className="username">
                        <Button variant="link" onClick={handleOpenDetail}>
                            {invitation.fromUser}
                        </Button>

                    </div>
                    <div>
                        <Button className="btn-friend-request" variant="success" size='sm' onClick={(e) => onProccessingInvitation(e, invitation._id, true)}
                        >Accept</Button>
                    </div>
                    <div>
                        <Button className="btn-friend-request" variant="danger" size='sm' onClick={(e) => onProccessingInvitation(e, invitation._id,     false)}
                        >Cancel</Button>
                    </div>
                </div>}
        </>
    )
}

export default FriendInvitation;
