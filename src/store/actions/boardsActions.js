
const addNewBoard = (newBoard) =>{
    return (dispatch) =>{
        dispatch({
            type: 'boards/addnew',
            payload: newBoard,
        })
    };
}

const updateBoardList = (boardList) =>{
    return (dispatch) =>{
        dispatch({
            type: 'boards/update',
            payload: boardList,
        })
    };
};

const filterBoardList = (filterString) =>{
    return (dispatch) =>{
        dispatch({
            type: 'boards/filter',
            payload: filterString,
        })
    };
};

export const boardsActions = {
    addNewBoard,
    updateBoardList,
    filterBoardList,
}