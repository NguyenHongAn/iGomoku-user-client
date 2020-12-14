import {applyMiddleware, createStore,compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: "igomoku",
    storage,
}

//tạo store chính từ các reducer đã combine
//dùng redux-persisit để luu các state lại trong localStore
//input: reducers chính, middleware thun
//output: store

const persistedReducer  = persistReducer(persistConfig, allReducers); 



export default () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return {
        store,
        persistor,
    }
};