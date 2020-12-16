import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
import {useSelector, useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap';
import JoinBoardDialog from './JoinBoardDialog';
import CreateBoardDialog from './CreateBoardDialog';


function Dashboard() {

    const [openInviteDialog, setOpenInviteDialog] = useState(false);

    const openCreateDialog= useSelector(state => state.match.isOpen);
    const socket = useSelector(state => state.socket.socket);
    const [player, setPlayer] = useState({});
    const dispatch = useDispatch();

    const handleInviteDialog = () => setOpenInviteDialog(!openInviteDialog);

    const handleCreateDialog = () => dispatch({type: "match/open", payload: !openCreateDialog});

    const history = useHistory();
    useEffect(() =>{
        //Nhận lời mời tham gia ván đấu từ người khác
        socket.on("invite-player", (info)=>{
            const dataRecive = JSON.parse(info);
            setOpenInviteDialog(!openInviteDialog);
            setPlayer(dataRecive);
        });

        //Lời mời tham gia ván đấu được chấp nhận
        socket.on("start-game", (info)=>{
            
            history.push(`/igomoku/board/${info}`);
        });
       
    },[history, openInviteDialog, setPlayer, socket]);

    return (
        
        <Container fluid className="h-100 main-container">
            <JoinBoardDialog show={openInviteDialog} 
            handleClose={handleInviteDialog} 
            player={player}></JoinBoardDialog>
            <CreateBoardDialog show={openCreateDialog} handleClose={handleCreateDialog}></CreateBoardDialog>
            <Row>
                <Col sm={9}></Col>
                <Col sm={3} className="tab-list">
                    <UserList></UserList>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;
