import React, {useState, useEffect} from 'react';
import UserList from '../../components/UserList/UserList';
import './Dashboard.css';
import {useHistory} from "react-router-dom";
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal';

function Dashboard() {

    const [isLogin, setIsLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [userInfo,setUserInfo] = useState({});

    const history = useHistory();

    const handleOpenModal = (userInfo) =>{
        setIsOpen(!isOpen);
        setUserInfo(userInfo);
    }

    useEffect(() =>{
       
    });

    return (
        <div className="main-container">
           <div style={{gridArea: "a1", display: "flex", justifyContent: "center"}}>
                {isOpen?
                    <UserInfoModal info={userInfo} handleOpenModal={handleOpenModal}></UserInfoModal>
                    : null
                }
           </div>
            <UserList handleOpenModal={handleOpenModal}></UserList>
            
        </div>
    )
}

export default Dashboard;
