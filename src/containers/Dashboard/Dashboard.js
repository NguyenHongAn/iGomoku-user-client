import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
//import {useHistory} from "react-router-dom";
import {Row, Col, Container} from 'react-bootstrap';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal';

function Dashboard() {

    //const [isLogin, setIsLogin] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);
    // const [userInfo,setUserInfo] = useState({});

    //const history = useHistory();

    // const handleOpenModal = (userInfo) =>{
    //     setIsOpen(true);
    //     setUserInfo(userInfo);
    // }

    // const handleClose = () => setIsOpen(false);
    // const handleShow = () => setIsOpen(true);

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
        // <div className="main-container">
        //    <div style={{gridArea: "a1", display: "flex", justifyContent: "center"}}>
        //         {/* {isOpen?
        //             <UserInfoModal info={userInfo} handleOpenModal={handleOpenModal}></UserInfoModal>
        //             : null
        //         } */}
        //    </div>
        //     <UserList ></UserList>
            
        // </div>
    )
}

export default Dashboard;
