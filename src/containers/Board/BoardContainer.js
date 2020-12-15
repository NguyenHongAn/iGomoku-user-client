import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';
import DropdownHistory from '../../components/DropdownHistory/DropdownHistory';
import vs from '../../assets/img/vs-image.png';
import {useSelector} from 'react-redux';
import ChatFrame from '../../components/ChatFrame/ChatFrame';

function BoardContainer() {
    
    const {user1, user2, winner} = useSelector(state => ({
        user1: state.board.user1,
        user2: state.board.user2,
        winner: state.board.winner,
    }))

    return (
        <Container fluid className="h-100 main-container">
        <Row>
            <Col sm={8}>
                <div className="board-container">
                
                    <Board></Board>
                   
                </div>
            </Col>
            <Col sm={4} className="tab-list">
                <div className="record-dropdown"> 
                    <div className="username" style={{color: "red", textAlign: "center"}}>
                        <h1>
                            user1.fullname
                        </h1>
                    </div>
                    <img src={vs} alt="VS"/>
                    <div className="username "style={{textAlign: "center"}}>
                        <h1>
                            user1.fullname
                        </h1>
                    </div>
                    <DropdownHistory></DropdownHistory>
                </div>
                <div className="chat-container"> 
                <ChatFrame></ChatFrame>
                </div>
            </Col>
        </Row>
    </Container>
    )
}

export default BoardContainer;
