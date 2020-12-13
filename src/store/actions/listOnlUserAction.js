import { io } from 'socket.io-client';

const setupSocket = () => {
    return (dispatch) =>{
        const socket = io(process.env.REACT_APP_SERVER, // link tới server
                        {
                            reconnectionDelayMax: 10000,
                            transports: ['websocket']
                        });

        socket.on("user-list", ()=>{
            dispatch({
                type: "SETUP_USERS_SOCKET",
                payload: socket,
            });
        });
    }
}

const fetchUserList = () =>{

}

const ListUserActions = {
    fetchUserList,
    setupSocket
}
export default ListUserActions;
