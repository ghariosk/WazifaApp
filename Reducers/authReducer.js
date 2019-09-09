import { combineReducers } from 'redux';
import {Auth} from 'aws-amplify'

const AUTH_STATE = {
	user: {name: "Hello"},
	loading: true,
	errorMessage: ''
};

const GET_USER = 'GET_USER';
const GET_USER_FULLFILLED = 'GET_USER_FULLFILLED';
const GET_USER_REJECTED = 'GET_USER_REJECTED'


const authReducer =  (state = AUTH_STATE, action) => {
	
	switch (action.type) {
		case  GET_USER:

			return {...state, loading: action.payload};
		case GET_USER_FULLFILLED:
			console.log(action.payload)
			return {...state, user: action.payload};
		case GET_USER_REJECTED:
			return {...state, errorMessage: action.payload}

		default:
			return state
	}
};


export default combineReducers({
	auth: authReducer,
})