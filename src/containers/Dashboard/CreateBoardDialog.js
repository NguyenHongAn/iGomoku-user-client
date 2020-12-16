import React, {useState} from 'react';

import {Modal, Form, Button} from 'react-bootstrap';
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';

function CreateBoardDialog({show, handleClose, player}) {

    const [boardName, setBoardName] = useState("");

    const {jwtToken,fullname, userID} = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        fullname: state.auth.fullname,
        userID: state.auth.userID,
    }));
 
    const socket = useSelector(state => state.socket.socket);

    const handleCreateBoard = (e) =>{
        e.preventDefault();

        try{

        }
        catch(erorr)
        {

        }
    }

    return (
        <Modal show={show} onHide={handleClose} animation={true} className="modal-style">
            
            <Modal.Header closeButton>
                <Modal.Title>Create match</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control type="text" placeholder="enter BoardName" 
                    onChange={(e) => setBoardName(e.target.value)}
                    value={boardName}/>
                </Form.Group>
               
            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="warning">Cancel</Button>
                <Button variant="info" onSubmit={handleCreateBoard}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBoardDialog;

