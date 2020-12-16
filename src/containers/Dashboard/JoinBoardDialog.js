import React from 'react';
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function JoinBoardDialog({show, handleClose, fullname}) {

  
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
                <Button variant="warning" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="info" onClick={handleClose}>
                    Accept
                </Button>
            </Modal.Footer>
          </div>
         
        </Modal>
    )
}

export default JoinBoardDialog;

