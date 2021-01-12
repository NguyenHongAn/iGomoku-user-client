const defaultState ={
  boards: [],
  filteredBoards: [],
  length: 0,
}

const boardListReducer = (state= defaultState, action) =>{
    switch (action.type) {
        case "boards/addnew":
        {
            const tempArray = Array.from(state.boards);
            tempArray.push(action.payload);
            return {
                ...state,
                boards: tempArray,
                filteredBoards: tempArray,
                length: state.length +1,
            }
        }
        case "boards/update":
            return {
                boards: Array.from(action.payload),
                filteredBoards: Array.from(action.payload),
                length: action.payload.length,
            }
        case "boards/filter":
        {
            const filterString = action.payload;
            const fullBoards = Array.from(state.boards);
            if (filterString !== "" && filterString !== undefined) {
                // thực hiện filter boards gắn vào filteredBoards
                const filteredBoards = fullBoards.filter(board => 
                    board._id.slice(board._id.length-5, board._id.length).toLowerCase().indexOf(filterString.toLowerCase()) !== -1
                    //board._id.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
                );
                //setBoards(filteredBoards);
                return {
                    ...state,
                    filteredBoards: filteredBoards,
                }
            }
            else {  // trả về đầy đủ danh sách board
                return {
                    ...state,
                    filteredBoards: fullBoards,
                }
            }
        }
        default:
            return state;
    }
}

export default boardListReducer;