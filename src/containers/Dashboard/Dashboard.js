import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
//import {useHistory} from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap';

function Dashboard() {

    useEffect(() =>{
       
    });

    return (
        <Container fluid className="h-100 dashboard-container">
            <Row>
                <Col sm={9}></Col>
                <Col sm={3} className="userlist">
                    <UserList></UserList>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;