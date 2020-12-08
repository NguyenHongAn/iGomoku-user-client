import {combineReducers} from 'redux';
import listOnlUserReducer from './listOnlUserReducer';

//combine các reducer lại với nhau 
const allReducers = combineReducers({
    listOnlUser: listOnlUserReducer,
})

export default allReducers;