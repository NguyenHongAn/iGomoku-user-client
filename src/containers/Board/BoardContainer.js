import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import './BoardContainer.css';
import Board from '../../components/Board/Board';

function BoardContainer() {

    

    return (
        <Container fluid className="h-100 main-container">
        <Row>
            <Col sm={8}>
                <div className="board-container">
                
                    <Board></Board>
                   
                </div>
            </Col>
            <Col sm={4} className="tab-list">
                <div className="record-dropdown"> </div>
                <div className="chat-container"> </div>
            </Col>
        </Row>
    </Container>
    )
}

export default BoardContainer;
