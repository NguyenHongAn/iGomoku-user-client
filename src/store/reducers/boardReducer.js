const defaultState = {
    history: [{                 //lịch sử các bước chơi cờ 
        squares: Array(16*16).fill(null),
        pos:-1,
        }],
                            //bàn cờ hiện tại
    stepNumber: 0,          //các bước đã thực hiện     
    boardID: "",            //Id của ván cờ 
    user1: {},              //thông tin người tạo
    user2: {},              //thông tin người chơi
    winner: {},
}

const boardReducer = (state= defaultState, action) =>{
    switch(action.type)
    {
        case "board/create":
            return {
                ...state,
                boardID: action.payload.boardID,
                user1: action.payload.user1,
                user2: action.payload.user2,
            }
        case 'board/saveHistory':
          {  
            const tempArray = Array.from(state.history);
            tempArray.push(action.payload);
            return {
                ...state,
                history: tempArray,
                stepNumber: state.history.length,
            }
        }
        
        case "board/finnishMatch":
            return {
                ...state,
                winner: action.payload,
            }
        default: 
        return state;
    }
}

export default boardReducer;