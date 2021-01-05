
const openCreateDialog = {
    type: "match/open",
    payload: true,
}

const closeCreateDialog = {
    type: "match/close",
    payload: false,
}

const createNewBoard = (size = 16, boardID, owner, player) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/create',
            payload: {
                size, 
                boardID,
                owner, 
                player
            },
        });
    }
}

const saveHistory = (history) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/saveHistory',
            payload: history
        });
    }
}

const winningDisplay = (winner) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/finnishMatch',
            payload: winner
        });
    }
}

const restoreDefault = {
    type: "match/restore",
    payload: "restore"
}

export const matchActions = {
    createNewBoard,
    saveHistory,
    winningDisplay,
    restoreDefault,
    openCreateDialog,
    closeCreateDialog,
}