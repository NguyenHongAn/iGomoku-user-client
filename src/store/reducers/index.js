import {combineReducers} from 'redux';
import listOnlUserReducer from './listOnlUserReducer';
import authReducer from './authReducer';
import socketReducer from './socketReducer';
import boardsReducer from './boardsReducer';

//combine các reducer lại với nhau 
const allReducers = combineReducers({
    socket: socketReducer,
    auth: authReducer,
    onlineUsers: listOnlUserReducer,
    boardList: boardsReducer,
})

export default allReducers;