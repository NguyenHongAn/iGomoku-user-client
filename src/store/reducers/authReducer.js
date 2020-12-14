import { faAcquisitionsIncorporated } from "@fortawesome/free-brands-svg-icons"

const defaultState ={
    jwtToken: "invalid token :))",
    fullname: 'unknown :))',
    userID: "0",
    username: "",
    password: "",
}

const authReducer = (state = defaultState,  action) =>{
    switch (action.type) {
        case "auth/signin":
            return {
                ...state,
                jwtToken: action.payload.jwt,
                fullname: action.payload.fullname,
                userID: action.payload.userID,
            }
        case "auth/signout":
            return {
                jwtToken: "invalid token :))",
                fullname: 'unknown :))',
                userID: 0,
                username: "",
                password: "",
            }
        case "auth/signup":
            return{
                ...state,
                username: action.payload.username,
                password: action.payload.password,
            }
        default:
           return state;
    }
}

export default authReducer;