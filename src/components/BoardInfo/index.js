import React from 'react';
import {useSelector} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy,faTimes} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {Button } from 'react-bootstrap';

function BoardInfo({current}) {
    const {owner, player, eloGot} = useSelector(state =>({
        owner: state.match.owner,
        player: state.match.player,
        eloGot: state.match.eloGot
    }));
    const userID = useSelector(state=> state.auth.userID);
    return (
    <div className="record-dropdown"> 
    <div className="player-info">
        <div className="seft-info">
            <p>Owner: {owner.fullname}</p>
            <span className="amount">
                <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
                    {owner.elo}
            </span>
            <div style={{fontSize: "20px"}}>
                Elo Got :ownerWinElo
            </div>
        </div>
        <div class="line"></div>
        <div className="seft-info">
            <p>Player: {player?player.fullname: "???"}</p>
            <span className="amount">
            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
                {player?player.elo: "???"}
            </span>
            <div style={{fontSize: "20px"}}>
            Elo Got :playerWinElo
        </div>           
        </div>
    </div>
    <div style={{
        fontSize: "30px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "40%"
        }}>
        <span>Turn: </span>
        {current ===owner._id?
        <FontAwesomeIcon icon={faTimes} color="red" size="xl"></FontAwesomeIcon>
        :<FontAwesomeIcon icon={faCircle} size="xl"></FontAwesomeIcon>
        }
    </div>
    <div style={{width: "100%"}}>
        <div style={{width: "100%"}}>
            <Button variant="warning" style={{
                width: "47%",
                margin : "5px 5px 5px 10px",
                }}>I'm lost</Button>
            <Button variant="success" style={{
                width: "47%",
                margin : "5px",
                }}>Draw</Button>
        </div>
        <div style={{width: "100%"}}>
        <Button variant="danger"
        style={{
            margin:"0px 10px 10px 10px",
            width: "96%"
        }}>Quit Game</Button>
        </div>
    </div>
    </div>
    )
}

export default BoardInfo;
