import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy,faTimes} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {Button } from 'react-bootstrap';
import axiosInstance from "../../api";
import {useHistory} from "react-router-dom";
import ReduxAction from '../../store/actions';
import {useDispatch} from 'react-redux';

function BoardInfo({current, status, owner, player, time, winner}) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const leaveBoard =()=>{
        if (owner.fullname === "???" || player.fullname === "???")
        {

        }
    }
    const gotoDashboard = ()=>{
        dispatch(ReduxAction.match.restoreDefault);
        history.push("/iGomoku");
    }
    let Buttoncontroll ;
    switch(status)
    {
        case "Waiting":
            Buttoncontroll = (
                <div style={{width: "100%"}}>
                <Button variant="danger"
                style={{
                    margin:"0px 10px 10px 10px",
                    width: "96%"
                }}>Quit Game</Button>
                </div>
            )
        break;
        case "Playing":
            Buttoncontroll = (
                <>
                <div style={{
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "80%"
                    }}>
                    <span>{time} </span>
                    <span>Turn: </span>
                    {current === owner._id?
                    <FontAwesomeIcon icon={faTimes} color="red" size="lg"></FontAwesomeIcon>
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
                </>
            );
            break;
        case "Winning":
            Buttoncontroll =(
                <>
                <div style={{
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "40%"
                    }}>
                    {winner}
                </div>
                <div style={{width: "100%"}}>
                <Button variant="danger"
                onClick={gotoDashboard}
                style={{
                    margin:"0px 10px 10px 10px",
                    width: "96%"
                }}>Leave Board</Button>
                </div>
                </>
            )
        default:
            break;
    }
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
        {Buttoncontroll}
    </div>
    )
}

export default BoardInfo;
