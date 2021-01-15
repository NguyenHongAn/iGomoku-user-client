import React from 'react'
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from "react-redux";

function RequestDrawDialog({show, handleClose, fullname}) {

    const socket = useSelector(state => state.socket.socket);


    const acceptDraw = ()=>{
        socket.emit("resquest-draw", ({agree: true}));
        handleClose(false);
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
      
              <Modal.Body>{`${fullname} is inviting you to join the game`}</Modal.Body>
      
            </div>
      
            {/* <!--Footer--> */}
            <Modal.Footer>
                <Button variant="warning" onClick={() => handleClose(false)}>
                    Cancel
                </Button>
                <Button variant="info" onClick={acceptDraw}>
                    Accept
                </Button>
            </Modal.Footer>
          </div>
         
        </Modal>
    )
}

export default RequestDrawDialog;
