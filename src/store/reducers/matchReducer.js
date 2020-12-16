const defaultState = {
    history: [{                 //lịch sử các bước chơi cờ 
        squares: Array(16*16).fill(null),
        pos:-1,
        }],
                            //bàn cờ hiện tại
    stepNumber: 0,          //các bước đã thực hiện     
    boardID: "",            //Id của ván cờ 
    boardName: "",
    owner: {},              //thông tin người tạo
    player: {},              //thông tin người chơi
    winner: {},
    isOpen: false,
    status: 0,              //-1:deny, 0: not create, 1:watting 2:palying
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
                status: 1,
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
        
        case "match/finnishMatch":
            return {
                ...state,
                winner: action.payload,
            }
        case "match/restore":
            return {
            
                history: [{                 //lịch sử các bước chơi cờ 
                    squares: Array(16*16).fill(null),
                    pos:-1,
                    }],
                                        //bàn cờ hiện tại
                stepNumber: 0,          //các bước đã thực hiện     
                boardID: "",            //Id của ván cờ 
                owner: {},              //thông tin người tạo
                player: {},              //thông tin người chơi
                winner: {},               
            }
        default: 
        return state;
    }
}

export default boardReducer;