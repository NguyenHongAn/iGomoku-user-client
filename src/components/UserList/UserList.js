import React, {useEffect, useState} from 'react';
import { Col,Nav, Button } from "react-bootstrap";
//import {connect, useDispatch, useSelector} from 'react-redux';
//import ListUserActions from '../../store/actions/listOnlUserAction';


import './UserList.css';
import {io} from "socket.io-client";


function UserList({handleOpenModal}) {
    
    //redux map state to props and map dispatch to props
    // const {socket, listUser} = useSelector(state =>({
    //     listUser: state.l    istOnlUser.users,
    //     socket: state.listOnlUser.socket,
    // })
    // ); 
    // const dispatch = useDispatch();

    const END_POINT = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;

    const [listUser, setListUser] = useState([]);

    const [notifyMsg, setNotifyMsg] = useState("");
    
    useEffect(() =>{
        const socket = io(END_POINT,{
            reconnectionDelayMax: 10000,
        });
        const userID = localStorage.getItem("userID"); 
        if (userID !== "0")
        {
            socket.emit("request-list-online-user", {userID});

            socket.on("response-list-online-user", (listOnlineUser)=>{
                const newUserList = JSON.parse(listOnlineUser).filter(user => user._id !== userID);
                console.log(newUserList);
                setListUser(newUserList);
                if (newUserList.length === 0)
                {
                    setNotifyMsg("No Online User");
                }
            });
            
        }
        // disconnect old socket each time re-render
        return () =>{
            // socket.emit("sign-out", {userID});
            socket.off();
        }
    },[END_POINT]);


    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="table-pane">
            <Nav color='dark' variant="tabs" className="tabs-header">
                <Nav.Item>
                    <Nav.Link className={activeTab === '1' ? 'active active-link' : ''} onClick={() => toggle('1')}>
                   Online  User
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={activeTab === '2' ? 'active active-link' : ''} onClick={() => toggle('2')}>
                        Friends 
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <div>
            
                {/* {notifyMsg === ""? */}
                    <table>
                    <tbody> 
                        {
                    listUser.map((user,i) =>{
                        return (
                            <tr className="table-flex" key={i}>
                            <td className="username">
                                <Button variant="link" onClick={() =>handleOpenModal(user)}>
                                    {user.fullname}
                                </Button>
                                
                                </td>
                            <td># {user.elo}</td>
                            <td>
                                <Button className="btn-friend-request" variant="link" size='sm'>Send</Button>
                            </td>
                            </tr>
                        )
                    })
                        }
                        </tbody>
                        </table>
                {/* :<h3>{notifyMsg}</h3> 
                }               */}
            </div>
            
            
        </div>
    )
}


// const mapState = (state) =>({
//     listUser: Array.from(state.listOnlUser.users),
//     socket: state.listOnlUser.socket,
//   });
  
// const mapDispatch = (dispatch) => ({
//     setupSocket: () =>{
//         dispatch(UserListActions.setupSocket());
//     }
    
// });


export default UserList;
