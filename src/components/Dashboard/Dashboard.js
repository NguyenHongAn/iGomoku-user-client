import React, {useState, useEffect} from 'react';
import UserList from '../UserList/UserList';
import './Dashboard.css';
import {useHistory} from "react-router-dom";

function Dashboard() {

    const [isLogin, setIsLogin] = useState(false);

    const history = useHistory();

    useEffect(() =>{
        if (localStorage.getItem("jwtToken") === "invalid token :))")
        {
            history.push("/auth/signin");
        }
       
    });

    return (
        <div className="main-container">
           
            <UserList></UserList>
            
        </div>
    )
}

export default Dashboard;
