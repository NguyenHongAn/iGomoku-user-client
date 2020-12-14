
const defaultState  = {
    users: [],
    friends: [],
};

const listOnlUserReducer = (state = defaultState, action) =>{
    switch (action.type) {
        case 'onlineUser/update':
            return {
                ...state,
                users: action.payload,
            }
        case 'friends/update':
            return {
                ...state,
                friends: action.payload,
            }
        default:
            return state;
    }
}

export default listOnlUserReducer;
