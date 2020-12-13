import React from 'react'
import './UserInfoModal.css';
import {Modal} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy,faCoins } from "@fortawesome/free-solid-svg-icons";

function UserInfoModal({info, handleOpenModal}) {
    console.log(info);
    return (
        
            <div className="container d-flex justify-content-center mt-5">
            <div className="card">
                <div className="top-container"> <img src="" className="img-fluid profile-image" width="70"/>
                    <div className="ml-3">
                        <h5 className="name">Clarke Jeffery</h5>
                        <p className="mail">clark@zmail.com</p>
                    </div>
                </div>
                <div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2">
                    <div className="d-flex flex-column text-right mr-2"> <span className="current-balance">Current Coin</span> 
                    <span className="amount">
                        <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                        {info.coin}
                    </span>
                    </div>
                    <div className="d-flex flex-column text-right mr-2"> <span className="current-balance">Current Elo</span> 
                        <span className="amount">
                            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
                        {info.elo}
                        </span> 
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default UserInfoModal;
