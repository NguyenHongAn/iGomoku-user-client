import React, {useState} from 'react';

import {Modal, Form, Button} from 'react-bootstrap';
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import {useToasts} from 'react-toast-notifications';
const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;

function CreateBoardDialog({show, handleClose}) {

    const [boardName, setBoardName] = useState("");

    const {jwtToken,fullname, userID} = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        fullname: state.auth.fullname,
        userID: state.auth.userID,
    }));
 
    const socket = useSelector(state => state.socket.socket);

    const player = useSelector(state => state.match.player);
    const dispatch = useDispatch();

    const { addToast } = useToasts();

    const handleCreateBoard = async (e) =>{
        e.preventDefault();
        try{
            //post dữ liệu tạo ván đấu mới
            const data = {
                userID: userID,
                boardName: boardName,
            }
            const response = await axios.post(`${APIURL}/board/create`, data,
             {
                headers:
                {
                    'Authorization': `Bearer ${jwtToken}`,
                }
            });
            //tạo payload
            const payload = {
                boardID: response.data._id,
                boardName: boardName,
                owner:{
                    fullname,
                    userID
                },
                player: player, //response.data.player
                status: 1,
            }

            // console.log(payload);
            //lưu thông tin người tạo ván đấu
            dispatch({
                type: "match/create",
                payload: payload
            })

            //thông báo tới người choi được mời qua socket ID
            
            socket.emit("invite_player", {
                ownerID: userID,                //id người tạo bàn cờ
                fullname: fullname,
                boardID: payload.boardID,
                boardName: payload.boardName,
                socketID: player.socketID
            });
            addToast("Create match success, Waitting fo opponent", 
            { 
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 10000,
            });

            handleClose();
            
        }
        catch(error)
        {
            addToast(error.response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    const handleCancel = () =>{
        dispatch({
            type: "match/clearPlayer"
        })
        handleClose();
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
                    <Form.Control type="text" placeholder="enter board name ....." 
                    onChange={(e) => setBoardName(e.target.value)}
                    value={boardName}/>
                </Form.Group>
               
            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="warning" onClick={handleCancel}>Cancel</Button>
                <Button variant="info" onClick={handleCreateBoard}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBoardDialog;

