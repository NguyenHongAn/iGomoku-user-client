import { io } from 'socket.io-client';

export const setupSocket = () => {
    return (dispatch) =>{
        const socket = io(process.env.REACT_APP_SERVER, // link tới server
                        {
                            reconnectionDelayMax: 10000,
                            path: '/igomoku/user-list', //đường dẫn riêng 
                        });

        socket.on("user-list", ()=>{
            dispatch({
                type: "SETUP_USERS_SOCKET",
                payload: socket,
            });
        });

        return 
    }
}

export const fetchUserList = () =>{

}

