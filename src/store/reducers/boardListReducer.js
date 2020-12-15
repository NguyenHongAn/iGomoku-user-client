const defaultState ={
  boards: [],
  length: 0,
}

const boardListReducer = (state= defaultState, action) =>{
    switch (action.type) {
        case "boards/addnew":
        {
            const tempArray = Array.from(state.boardList);
            tempArray.push(action.payload);
            return {
                ...state,
                boardList: tempArray,
                length: state.length +1,
            }
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

export default boardListReducer;