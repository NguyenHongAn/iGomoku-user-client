import React from 'react';
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';


function JoinBoardDialog({show, handleClose,player}) {

  const dispatch = useDispatch();

  const {socket, socketID} = useSelector(state => ({
    socket: state.socket.socket,
    socketID: state.socket.socketID
  }));

  const history = useHistory();
  const denyInvite =()=>{



    handleClose();
  }

  const acceptInvite = async()=>{
    handleClose();
    //get playerID
    const payload = {
      boardID: player.boardID,
      boardName: player.boardName,
      owner: player.owner,
      player: player.player //response.data.player
    }
    dispatch({
      type: "match/create",
      payload: payload
    })

    const boardId = payload.boardID;
    
    //console.log(`/board/${payload.boardID}`);
    socket.emit("accept-invite", ({boardId}));
    history.push(`/igomoku/board/${payload.boardID}`);
  }

    return (
        <Modal show={show} onHide={handleClose} animation={true} className="modal-style">   
          <div className="modal-content text-center">
          <Modal.Header closeButton>
            
              <Modal.Title> New Game</Modal.Title>
            
            </Modal.Header>
            {/* <!--Body--> */}
            <div class="modal-body">
      
              <FontAwesomeIcon icon={faBell} size="4x" style={{color: "yellow"}}></FontAwesomeIcon>
      
              <Modal.Body>{`${player.fullname} is inviting you to join the game`}</Modal.Body>
      
            </div>
      
            {/* <!--Footer--> */}
            <Modal.Footer>
                <Button variant="warning" onClick={denyInvite}>
                    Cancel
                </Button>
                <Button variant="info" onClick={acceptInvite}>
                    Accept
                </Button>
            </Modal.Footer>
          </div>
         
        </Modal>
    )
}

export default JoinBoardDialog;

