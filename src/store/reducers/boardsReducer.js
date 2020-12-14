const defaultState ={
    boardList: [],
    length: 0,
}

const boardsReducer = (state= defaultState, action) =>{
    switch (action.type) {
        case "boards/addnew":
            return {
                ...state,
                boardList: Array.from(state.boardList.push(action.payload)),
                length: state.length +1,
            }

        case "boards/update":
            return {
                boarlist: Array.from(action.payload),
                length: action.payload.length,
            }
        default:
            return state;
    }
}

export default boardsReducer;