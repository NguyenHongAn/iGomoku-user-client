import React, { useEffect, useState } from 'react';
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import ReduxAction from '../../store/actions';
import UserListItem from './UserListItem/UserListItem';
import FriendInvitation from './UserListItem/FriendInvitation';
import './UserList.css';
import { useToasts } from "react-toast-notifications";
import axiosInstance from '../../api';

function UserList() {

    //redux map state to props and map dispatch to props
    const { socket } = useSelector(state => ({
        socket: state.socket.socket,
    })
    );

    const { jwtToken, userID } = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        userID: state.auth.userID,
    }));

    const { onlineUsers, friends } = useSelector(state => ({
        onlineUsers: state.onlineUsers.users,
        friends: state.onlineUsers.friends,
    }));

    const [listFriendInvitation, setListFriendInvitaion] = useState([]);

    const dispatch = useDispatch();

    const { addToast } = useToasts();


    useEffect(() => {
        //get online user list 
        //socket.emit("request-list-online-user", {userID});

        socket.on("response-online-user", ({ user }) => {
            console.log(user);
            if (user._id !== userID) {
                const isExists = onlineUsers.some(onlUser => onlUser._id === user._id);
                if (!isExists) {
                    dispatch(ReduxAction.users.addNewUserOnline(user));
                }
            }
        });
        socket.on("response-user-offline", ({ offlineUser }) => {
            console.log(offlineUser);
            const newUsersList = onlineUsers.filter(onlUser => onlUser._id !== offlineUser);
            dispatch(ReduxAction.users.updateOnlineUserlist(newUsersList));
        })

        return () => {
            socket.off("response-online-user");
            socket.on("response-user-offline");
        }
        // disconnect old socket each time re-render
    }, [addToast, dispatch, onlineUsers, socket, userID]);

    useEffect(() => {
        (async () => {
            // get friend's list with GET method
            if (userID !== "0") {
                try {
                    const response = await axiosInstance.get(`/user/list-friend`, {
                        params: {
                            userId: userID
                        }
                    });
                    if (response.status === 200) {
                        dispatch(ReduxAction.users.updateFriendList(response.data));
                    }

                } catch (error) {
                    console.log(error);
                    addToast(error.response.data.message, {
                        appearance: "error",
                        autoDismiss: true,
                    });
                }
            }

        })();
    }, [addToast, dispatch, jwtToken, userID]);

    useEffect(() => {
        (async () => {
            // get friend invitation list with GET method
            if (userID !== "0") {
                try {
                    const response = await axiosInstance.get(`/user/list-friend-invitation`, {
                        params: {
                            userId: userID
                        }
                    });
                    if (response.status === 200) {
                        setListFriendInvitaion(response.data);
                    }

                } catch (error) {
                    console.log(error);
                    addToast(error.response.data.message, {
                        appearance: "error",
                        autoDismiss: true,
                    });
                }
            }

        })();
    }, [addToast, jwtToken, userID]);

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const onProccessingInvitation = async function (e, id, status) {
        //đăng nhập để process lời mời kết bạn
        if (userID === "0") {
            // history.push("/auth/signin");
        }
        else {
            try {
                const data = {
                    userId: userID,
                    invitationId: id,
                    status: status
                }


                const response = await axiosInstance.post(`/user/on-processing-friend-invitation`, data,
                    {
                        headers:
                        {
                            'Authorization': `Bearer ${jwtToken}`,
                        }
                    });
                if (response.status === 200) {
                    const message = status === true ? 'Chấp nhận lời mời kết bạn thành công' : 'Bỏ qua lời mời kết bạn thành công';
                    addToast(message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });

                    setListFriendInvitaion(response.data.listInvitation);
                    dispatch(ReduxAction.users.updateFriendList(response.data.listFriend));

                }

            } catch (error) {
                addToast(error.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }

        }
    };

    const sendUnFriendRequest = async function (playerId) {
        if (playerId === -1)
            return;

        if (playerId) {
            console.log("playerId: " + playerId.toString());
        }

        //đăng nhập để gửi lời mời kết bạn
        if (userID === "0") {
            // history.push("/auth/signin");
        }
        else {
            try {
                const data = {
                    userId: userID,
                    playerId: playerId
                }


                const response = await axiosInstance.post(`/user/unfriend`, data,
                    {
                        headers:
                        {
                            'Authorization': `Bearer ${jwtToken}`,
                        }
                    });
                if (response.status === 200) {
                    addToast("Hủy kết bạn thành công", {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    dispatch(ReduxAction.users.updateFriendList(response.data));
                }

            } catch (error) {
                // addToast(error.response.data.message, {
                //     appearance: 'error',
                //     autoDismiss: true,
                // });
            }

        }
    };


    return (
        <div className="table-pane">
            <Nav color='dark' variant="tabs" className="tabs-header">
                <Nav.Item>
                    <Nav.Link className={activeTab === '1' ? 'active active-link' : ''} onClick={() => toggle('1')}>
                        Trực tuyến
                    </Nav.Link>
                </Nav.Item>
                {userID !== "0" ? <Nav.Item>
                    <Nav.Link className={activeTab === '2' ? 'active active-link' : ''} onClick={() => toggle('2')}>
                        Bạn bè
                    </Nav.Link>
                    <Nav.Link className={activeTab === '3' ? 'active active-link' : ''} onClick={() => toggle('3')}>
                        Lời mời kết bạn
                    </Nav.Link>
                </Nav.Item>
                    : null}
            </Nav>
            <div style={{ display: "block" }}>
                {userID !== "0" && activeTab === "2" ?
                    friends.map(friend => {
                        return <UserListItem user={friend} type={"2"} sendUnFriendRequest={sendUnFriendRequest} key={friend._id}></UserListItem>
                    })
                    : (activeTab === "1" ? onlineUsers.map((user) => {
                        return (
                            <UserListItem user={user} type={"1"} sendUnFriendRequest={sendUnFriendRequest} key={user._id}></UserListItem>
                        )
                    }) :
                        listFriendInvitation.map(invitation => {
                            return <FriendInvitation invitation={invitation} onProccessingInvitation={onProccessingInvitation} key={invitation._id}></FriendInvitation>
                        })
                    )
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
