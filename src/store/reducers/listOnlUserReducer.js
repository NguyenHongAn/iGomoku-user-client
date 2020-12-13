
const defaultState  = {
    users: [],
};

const listOnlUserReducer = (state = defaultState, action) =>{
    switch (action.type) {
        case 'onlineUser/update':
            return {
                ...state,
                users: action.payload,
            }
        default:
            return state;
    }
}

export default listOnlUserReducer;
