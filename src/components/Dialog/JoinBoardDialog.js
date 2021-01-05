import React from 'react';
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from "react-redux";
import {useToasts} from 'react-toast-notifications';
import axiosInstance from '../../api';
import {useHistory} from 'react-router-dom';

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;


function JoinBoardDialog({show, handleClose,player}) {

  const dispatch = useDispatch();

  const {addToast} = useToasts();
  const {socket, socketID} = useSelector(state => ({
    socket: state.socket.socket,
    socketID: state.socket.socketID
  }));

  const  userID = useSelector(state => state.auth.userID)

  const history = useHistory();
  const denyInvite =()=>{



    handleClose();
  }

  const acceptInvite = async()=>{
    handleClose();
    //send joinboard request
    try {
      console.log(player);
      const boardID = player.boardID;
      const data = {
        boardID: boardID,
        userID: userID,
      }

      const response = await axiosInstance.post(`${APIURL}/board/on-join`, data);

      const payload = {
        boardID: player.boardID,
        boardName: player.boardName,
        owner: player.ownerID, //id người tạo
        player: userID,       //id người chập nhận lời mời cũng là người chơi
        status: 2
      };
      
      dispatch({
        type: "match/create",
        payload: payload
      });
      
      if(response.status ===200)
      { 
        socket.emit("accept_invite", ({boardID}));
        history.push(`/board/${boardID}`);
      }
     
    } catch (error) {
      console.log(error);
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    //get playerID
    
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

