import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './authReducer'


const AppReducers = combineReducers({
	auth: authReducer,
})

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}


let store = createStore(rootReducer, compose(applyMiddleware(thunk)));


export default store;