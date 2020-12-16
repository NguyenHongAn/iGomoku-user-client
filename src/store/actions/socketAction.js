import { io } from 'socket.io-client';

const setupSocket = () => {
    return (dispatch) =>{
        const socket = io(process.env.REACT_APP_APIURL, // link tới server
                        {
                            reconnectionDelayMax: 10000,
                            transports: [ 'websocket' ] 
                        });
       
        dispatch({
            type: "socket/setupsocket",
            payload: socket,
        });
       
    }
}

export default setupSocket;