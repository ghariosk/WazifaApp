// import {GET_USER,GET_USER_FULLFILLED, GET_USER_REJECTED} from './authTypes';
export const GET_USER = 'GET_USER';
export const GET_USER_FULLFILLED = 'GET_USER_FULLFILLED';
export const GET_USER_REJECTED = 'GET_USER_REJECTED'

import {Auth} from 'aws-amplify'

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_USER,
        payload: bool,
    };
}

export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_USER_FULLFILLED,
        payload: data,
        loading: false,
    };
}


export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_USER_REJECTED,
        payload: error,
        loading: false,
    };
}



export const getUser = () => {
    return async dispatch => {
        try {
        dispatch(fetchData(true))



        const user = await Auth.currentAuthenticatedUser()

        dispatch(fetchDataFulfilled(user))
        } catch (err) {
            console.log(err)
            fetchDataRejected(err)

        }
    }
}