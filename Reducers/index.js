import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import {authReducer,jobsReducer} from './authReducer'


const AppReducers = combineReducers({
	auth: authReducer,
	jobs: jobsReducer
})

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}


let store = createStore(rootReducer, compose(applyMiddleware(thunk)));


export default store;