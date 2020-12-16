import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
import {useSelector, useDispatch } from 'react-redux';
//import {useHistory} from "reac-router-dom";
import {Row, Col, Container} from 'react-bootstrap';
import JoinBoardDialog from './JoinBoardDialog';
import CreateBoardDialog from './CreateBoardDialog';


function Dashboard() {

    const [openInviteDialog, setOpenInviteDialog] = useState(false);

    const openCreateDialog= useSelector(state => state.match.isOpen);
    const dispatch = useDispatch();

    const handleInviteDialog = () => setOpenInviteDialog(!openInviteDialog);

    const handleCreateDialog = () => dispatch({type: "match/open", payload: !openCreateDialog});

    useEffect(() =>{
       
    });

    return (
        
        <Container fluid className="h-100 main-container">
            <JoinBoardDialog show={openInviteDialog} handleClose={handleInviteDialog} ></JoinBoardDialog>
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
