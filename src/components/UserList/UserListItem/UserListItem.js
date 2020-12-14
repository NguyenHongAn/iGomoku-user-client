import React, {useState} from 'react'
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faTimes, faCoins } from "@fortawesome/free-solid-svg-icons";
import '../UserList.css';



function UserListItem({user}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenDetail = () => setIsOpen(!isOpen);

    return (
        <>
       {isOpen?
        <div className="card">
            <Button variant='link' className="btn-close" onClick={handleOpenDetail}>
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </Button>
            <div className="top-container"> 
                <img src="" className="img-fluid profile-image" width="70"/>
                    <div className="ml-3">
                        <h5 className="name">{user.fullname}</h5>
                        <p className="mail">{user.email}</p>
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
                <p>matches: </p>
                <p>wins: </p>
            </div>
       <div className="bottom-container"> 
           <Button variant="success" className="buttom-btn">Add Friend</Button>
           <Button variant="info" className="bottm-btn">Challenge</Button>
       </div>
        </div>
       : <div className="table-item" key={user._id}>
        <div className="username">
            <Button variant="link" onClick={handleOpenDetail}>
                {user.fullname}
            </Button>
            
            </div>
        <div className="elo-display"><FontAwesomeIcon color="yellow" icon={faTrophy}></FontAwesomeIcon> {user.elo}</div>
        <div>
            <Button className="btn-friend-request" variant="info" size='sm'>Challenge</Button>
        </div>
        </div>}
        </>
    )
}

export default UserListItem;
