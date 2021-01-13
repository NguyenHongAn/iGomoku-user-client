import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faTimes, faCoins } from "@fortawesome/free-solid-svg-icons";
import '../UserList.css';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;

function UserBXHItem({ user, type, ranking, sendUnFriendRequest }) {

    const [isOpen, setIsOpen] = useState(false);
    const { jwtToken, userID } = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        userID: state.auth.userID,
    }));

    const createdDate = new Date(user.createdDate);

    const history = useHistory();

    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const handleOpenDetail = () => setIsOpen(!isOpen);


    const sendFriendRequest = async () => {
        //đăng nhập để gửi lời mời kết bạn
        if (userID === "0") {
            history.push("/auth/signin");
        }
        else {
            try {
                const data = {
                    fromUserId: userID,
                    toUserId: user._id,
                }


                const response = await axios.post(`${APIURL}/user/send-friend-invitation`, data,
                    {
                        headers:
                        {
                            'Authorization': `Bearer ${jwtToken}`,
                        }
                    });
                if (response.status === 200) {
                    addToast("Friend request have been sent", {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                }

            } catch (error) {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }

        }
    };


    const challenge = () => {
        dispatch({ type: "match/open", payload: true });
        dispatch({
            type: "match/storePlayerTemporary",
            payload: user
        });
    }

    var rankingColor = "white";
    switch (ranking) {
        case 1:
            rankingColor = "red";
            break;
        case 2:
            rankingColor = "orange";
            break;
        case 3:
            rankingColor = "yellow";
            break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            rankingColor = "skyblue";
            break;
        default:
            rankingColor = "white";
            break;
    }


    return (
        <>
            {isOpen ?
                <div className="card">
                    <Button variant='link' className="btn-close" onClick={handleOpenDetail}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </Button>
                    <div className="top-container">
                        {/* <img src="" className="img-fluid profile-image" width="70"/> */}
                        <div className="ml-3">
                            <h5 className="name">{user.fullname}</h5>
                            <p className="mail">{user.email}</p>
                            <p>Winrate: {user.winrate} %</p>
                            <p>Join Date: {createdDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2">
                        <div className="d-flex flex-column text-right mr-2"> <span className="current-balance">Current Coin</span>
                            <span className="amount">
                                <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                                {user.coin}
                            </span>
                        </div>
                        <div className="d-flex flex-column text-right mr-2"> <span className="current-balance">Current Elo</span>
                            <span className="amount">
                                <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
                                {user.elo}
                            </span>
                        </div>


                    </div>
                    <div className="bottom-container">
                        <p>matches: {user.matches.length}</p>
                        <p>wins: {user.winningGame.length}</p>
                    </div>
                    <div className="bottom-container">
                        <Button variant="success" className="buttom-btn"
                            onClick={sendFriendRequest}>Add Friend</Button>
                        <Button variant={"info"} className="bottm-btn">Challenge</Button>
                    </div>
                </div>
                : <div className="table-item" key={user._id}>
                    <div className="username">
                        <Button variant="link" onClick={handleOpenDetail} style={{ fontWeight: 'bold', color: rankingColor }}>
                            <span style={{ fontWeight: 'bold', color: rankingColor }}>
                                <span >{ranking}. &nbsp;</span>
                                <span >{user.fullname}</span>
                            </span>
                        </Button>

                    </div>
                    <div className="elo-display"> {user.elo}&nbsp; <FontAwesomeIcon color="yellow" icon={faTrophy}></FontAwesomeIcon></div>
                    <div>
                        <Button className="btn-friend-request" variant="info" size='sm'
                            onClick={challenge}>Challenge</Button>
                    </div>
                </div>}
        </>
    )
}

export default UserBXHItem;
