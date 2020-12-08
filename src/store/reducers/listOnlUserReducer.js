

const defaultState  = {
    socket: null, 
    users: [
        {
            fullname: "Nguyen Hong",
            elo: 2000,
        },
        {
            fullname: "Thanh Hao",
            elo: 2000,
        },
        {
            fullname: "Minh Nguyet",
            elo: 2000,
        }
    ],
};

const listOnlUserReducer = (state = defaultState, action) =>{
    switch (action.type) {
        case "SETUP_USERS_SOCKET": 
            return {
                ...state,
                socket: action.payload,
            }
        default:
            return state;
    }
}

export default listOnlUserReducer;
