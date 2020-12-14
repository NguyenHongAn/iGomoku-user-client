import React, {useEffect, useState} from 'react';
import { Col,Nav, Button } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import ListUserActions from '../../store/actions/listOnlUserAction';
import UserListItem from './UserListItem/UserListItem';
import './UserList.css';
import { useToasts } from "react-toast-notifications";
import axiosInstance from '../../api/axiosInstance';
const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_API_DEPLOY_URL;

function UserList() {
    
    //redux map state to props and map dispatch to props
    const {socket, socketID} = useSelector(state =>({
       socket: state.socket.socket,
       socketID: state.socket.socketID,
    })
    );

    const userID = useSelector(state => state.auth.userID);

    const {onlineUsers,friends} = useSelector(state => ({
        onlineUsers: state.onlineUsers.users,
        friends: state.onlineUsers.friends,
    }));

    const dispatch = useDispatch();

    const { addToast } = useToasts();
   
    
    useEffect(() =>{
        //get online user list 
        const fetchData = async () =>{
             socket.emit("request-list-online-user", {userID});

        socket.on("response-list-online-user", (listOnlineUser)=>{
                const newUserList = JSON.parse(listOnlineUser).filter(user => user._id !== userID);
                newUserList.sort((a,b) =>{
                    return b.elo - a.elo;
                });

                dispatch(ListUserActions.updateOnlineUserlist(newUserList));

                if (newUserList.length === 0)
                {
                    addToast("No user online", {
                        appearance: 'info',
                        autoDismiss: true,
                    });
                }
            });
                
            // get friend's list with GET method
            if(userID !== "0")
            {
                try {
                    const friendsList = await axiosInstance.get(`${APIURL}/user/list-friend`);
                    console.log(friendsList);
                } catch (error) {
                    
                }
            }
           
        }
        fetchData();
        // disconnect old socket each time re-render
        return () =>{
            // socket.emit("sign-out", {userID});
            socket.off();
        }
    },[addToast, dispatch, socket, userID]);


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
            <div style={{display: "block"}}>                                               
                {
                    onlineUsers.map((user) =>{
                        return (
                           <UserListItem user={user}></UserListItem>
                        )
                    })
                }                     
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
