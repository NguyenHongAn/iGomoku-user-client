const defaultState = {

    stepNumber: 0,          //các bước đã thực hiện     
    boardID: null,            //Id của ván cờ 
    boardName: "",
    owner: {},              //thông tin người tạo
    player: {},              //thông tin người chơi
    isOpen: false,
    password: "",
    boardStatus: 0,              //-1:deny, 0:not create, 1:watting, 2:playing
    eloGot: 0,
    role: 0,
}

const boardReducer = (state = defaultState, action) =>{
    switch(action.type)
    {
        case "match/open":
            return {
                ...state,
                isOpen: action.payload,
            }
        case "match/create":
            return {
                ...state,
                boardID: action.payload.boardID,
                owner: action.payload.owner,
                boardName: action.payload.boardName,
                player: action.payload.player,
                status: action.payload.status,
                role: action.payload.role,
            }
        case "match/storePlayerTemporary":
        return{
            ...state,
            player: action.payload,
        }
        case "match/clearPlayer": 
        return {
            ...state,
            player: {},
        }
        case "match/updateinfo":
            return {
                ...state,
                owner: action.payload.owner,
                player: action.payload.player,
                eloGot: action.payload.eloGot,
                status: action.payload.status,
                password: action.payload.password,
            }
        case 'match/saveHistory':
          {  
            const tempArray = Array.from(state.history);
            tempArray.push(action.payload);
            return {
                ...state,
                history: tempArray,
                stepNumber: state.history.length,
            }
        }
        case "match/updateStatus":
        return {
            ...state,
            boardStatus: action.payload,
        }
        case "match/finnishMatch":
            return {
                ...state,
                winner: action.payload,
            }
        case "match/restore":
            return {
                stepNumber: 0,          //các bước đã thực hiện     
                boardID: null,            //Id của ván cờ 
                boardName: "",
                owner: {},              //thông tin người tạo
                player: {},              //thông tin người chơi
                password: "",
                boardStatus: 0,           //-1:deny, 0:not create, 1:waiting, 2:playing
                eloGot: 0,        
                isOpen: false,    
            }
        default: 
        return state;
    }
}

export default boardReducer;