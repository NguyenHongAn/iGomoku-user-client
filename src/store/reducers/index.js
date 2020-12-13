import {combineReducers} from 'redux';
import listOnlUserReducer from './listOnlUserReducer';
import authReducer from './authReducer';


//combine các reducer lại với nhau 
const allReducers = combineReducers({
    listOnlUser: listOnlUserReducer,
    auth: authReducer,
})

export default allReducers;