const defaultState ={
    jwtToken: "invalid token :))",
    fullname: 'unknown :))',
    userID: "0",
}

const authReducer = (state = defaultState,  action) =>{
    switch (action.type) {
        case "auth/signin":
            return {
                jwtToken: action.payload.jwt,
                fullname: action.payload.fullname,
                userID: action.payload.userID,
            }
        case "auth/signout":
            return {
                jwtToken: "invalid token :))",
                fullname: 'unknown :))',
                userID: 0,
            }
        default:
           return state;
    }
}

export default authReducer;