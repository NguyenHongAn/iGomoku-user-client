import {combineReducers} from 'redux';
import socketReducer from './socketReducer';

//combine các reducer lại với nhau 
const allReducers = combineReducers({
    socketReducer,
})

export default allReducers;