import React, {useEffect, useState} from 'react';
import { Col,Nav, Button } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import ListUserActions from '../../store/actions/listOnlUserAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

import './UserList.css';

function UserList({handleOpenModal}) {
    
    //redux map state to props and map dispatch to props
    const {socket, socketID} = useSelector(state =>({
       socket: state.socket.socket,
       socketID: state.socket.socketID,
    })
    );

    const userID = useSelector(state => state.auth.userID);

    const onlineUsers = useSelector(state => state.onlineUsers.users);
    const dispatch = useDispatch();

    
   
    
    useEffect(() =>{
      
        socket.emit("request-list-online-user", {userID});
           
        socket.on("response-list-online-user", (listOnlineUser)=>{
            const newUserList = JSON.parse(listOnlineUser).filter(user => user._id !== userID);
            console.log('getresponseData');
            console.log(newUserList);

            dispatch(ListUserActions.updateOnlineUserlist(newUserList));

            if (newUserList.length === 0)
            {
                //setNotifyMsg("No Online User");
            }
        });
            
        // disconnect old socket each time re-render
        return () =>{
            // socket.emit("sign-out", {userID});
            socket.off();
        }
    },[dispatch, socket, userID]);


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
               {userID !== "0"? <Nav.Item>
                    <Nav.Link className={activeTab === '2' ? 'active active-link' : ''} onClick={() => toggle('2')}>
                        Friends 
                    </Nav.Link>
                </Nav.Item>
                :null}
            </Nav>
            <div>
            
                {/* {notifyMsg === ""? */}
                    <table>
                    <tbody> 
                        {
                    onlineUsers.map((user,i) =>{
                        return (
                            <tr className="table-flex" key={i}>
                            <td className="username">
                                <Button variant="link" onClick={() =>handleOpenModal(user)}>
                                    {user.fullname}
                                </Button>
                                
                                </td>
                            <td><FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon> {user.elo}</td>
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
