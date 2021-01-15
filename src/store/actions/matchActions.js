
const openCreateDialog = {
    type: "match/open",
    payload: true,
}

const closeCreateDialog = {
    type: "match/close",
    payload: false,
}

const startNewMatch = (newMatch) =>{
    return (dispatch) =>{
        dispatch({
            type: 'match/create',
            payload: newMatch
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

const updateInfo = (newInfo) =>{
    return (dispatch)=>{
        dispatch({
            type: "match/updateinfo",
            payload: newInfo
        })
    }
}


const updateStatus= (status) =>{
    return (dispatch)=>{
        dispatch({
            type: "match/updateStatus",
            payload: status
        })
    }
}

export const matchActions = {
    startNewMatch,
    saveHistory,
    winningDisplay,
    restoreDefault,
    openCreateDialog,
    closeCreateDialog,
    updateInfo,
    updateStatus,
}