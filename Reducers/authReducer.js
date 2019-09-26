import { combineReducers } from 'redux';
import {Auth} from 'aws-amplify'

const AUTH_STATE = {
	user: {},
	loading: true,
	errorMessage: ''
};


const JOBS_STATE = {
	jobs: {},
	loading: true,
	errorMessage: ''
}
const GET_USER = 'GET_USER';
const GET_USER_FULLFILLED = 'GET_USER_FULLFILLED';
const GET_USER_REJECTED = 'GET_USER_REJECTED'


const GET_JOBS = 'GET_JOBS'
const GET_JOBS_FULFILLED='GET_JOBS_FULFILLED';
const GET_JOBS_REJECTED = "GET_JOBS_REJECTED"

const ADD_NEW_JOB_REQUEST = 'ADD_NEW_JOB_REQUEST';
const ADD_NEW_JOB_REQUEST_FULLFILLED = 'ADD_NEW_JOB_REQUEST_FULLFILLED';
const ADD_NEW_JOB_REQUEST_REJECTED = 'ADD_NEW_JOB_REQUEST_REJECTED'


export const authReducer =  (state = AUTH_STATE, action) => {
	
	switch (action.type) {
		case  GET_USER:

			return {...state, loading: action.payload};
		case GET_USER_FULLFILLED:
			return {...state, user: action.payload, loading: false};
		case GET_USER_REJECTED:
			return {...state, errorMessage: action.payload}

		default:
			return state
	}
};

export const jobsReducer= (state = JOBS_STATE, action) => {
	switch (action.type) {
		case  GET_JOBS:
			return {...state, loading: action.payload};
		case GET_JOBS_FULFILLED:
			return {...state, jobs: action.payload, loading: false};
		case GET_JOBS_REJECTED:
			return {...state, errorMessage: action.payload};
		// case ADD_NEW_JOB_REQUEST:
		// 	return {...state,loading: action.payload}
		// case ADD_NEW_JOB_REQUEST_FULLFILLED:
		// 	return {...state, jobs: {...state.jobs, action.payload}, loading: false}
		// case ADD_NEW_JOB_REQUEST_REJECTED:
		// 	return {...state, errorMessage: action.payload}

		default:
			return state
	}
}


// export default combineReducers({
// 	auth: authReducer,
// 	jobs: jobsReducer
// })