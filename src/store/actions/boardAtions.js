

const createNewBoard = (size = 16, boardID, user1, user2) =>{
    return (dispatch) =>{
        dispatch({
            type: 'board/create',
            payload: {
                size, 
                boardID,
                user1, 
                user2
            },
        });
    }
}

const saveHistory = (history) =>{
    return (dispatch) =>{
        dispatch({
            type: 'board/saveHistory',
            payload: history
        });
    }
}

const winningDisplay = (winner) =>{
    return (dispatch) =>{
        dispatch({
            type: 'board/finnishMatch',
            payload: winner
        });
    }
}

const restoreDefault = {
    type: "board/restore",
    payload: "restore"
}

export const boardActions = {
    createNewBoard,
    saveHistory,
    winningDisplay,
}