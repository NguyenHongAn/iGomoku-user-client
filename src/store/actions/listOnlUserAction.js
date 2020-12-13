
const updateOnlineUserlist = (onlineUsers) =>{
    return (dispatch) =>{
        dispatch({
            type: "onlineUser/update",
            payload: onlineUsers,
        });
    }
}


const fetchUserList = () =>{

}

const ListUserActions = {
    fetchUserList,
    updateOnlineUserlist,
}
export default ListUserActions;
