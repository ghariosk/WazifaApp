import {GET_JOBS,GET_JOBS_FULFILLED, GET_JOBS_REJECTED, ADD_NEW_JOB_REQUEST ,ADD_NEW_JOB_REQUEST_FULFILLED, ADD_NEW_JOB_REQUEST_REJECTED} from './jobsTypes';
import {Auth, Storage} from 'aws-amplify'



 const fetchJobsData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_JOBS,
        payload: bool,
    };
}

 const fetchJobsDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_JOBS_FULFILLED,
        payload: data,
        loading: false,
    };
}


const fetchJobsDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_JOBS_REJECTED,
        payload: error,
        loading: false,
    };
}

// const addJobRequest = (bool) => {
//     return {
//         type: ADD_NEW_JOB_REQUEST,
//         payload: bool
//     }
// }

// const addJobRequestFulfilled = (data) => {
//     return {
//         type: ADD_NEW_JOB_REQUEST_FULFILLED,
//         payload: bool
//     }
// }

// const addJobRequestRejected = (error) => {
//     return {
//         type: ADD_NEW_JOB_REQUEST_REJECTED,
//         payload: error,
//         loading: false
//     }
// }




export const getJobs =  () => {

    return async dispatch => {
        try {
        dispatch(fetchJobsData(true))

        let jwt
        await Auth.currentSession().then(res=>{
        let idToken = res.idToken
        jwt = idToken.getJwtToken()
        }).catch((err) => console.log(err))

        console.log(jwt)

        const rawResponse = await fetch('https://urbj1ulno3.execute-api.us-east-1.amazonaws.com/Dev/listJobs', {
            headers: {
                'Accept': 'application/json',
                'authorizationToken': jwt
            }
        })

        const data = await rawResponse.json()

        if (data) {
            await data.results.forEach( async (object, index) => {

                var image = await Storage.get(`${object.idjobs}/*.jpeg`, {level: 'protected'})

                console.log(index)
                data.results[index].image_uri = image

        
       


        })
        }

        console.log(data.results)

        

    


     



        dispatch(fetchJobsDataFulfilled(data.results))


        } catch(err) {
            console.log(err)
            dispatch(fetchJobsDataRejected(err))
        }
    }
}


// export const addJob = (category,subcategory,schedule_date,duration,hasDuration,asap) => {
//     return async dispatch => {
//         try {
//             dispatch(addJobRequest(true))
//             let jwt
//              await Auth.currentSession()
//                 .then(res=>{
//                     let idToken = res.idToken
//                     jwt = idToken.getJwtToken()})
//                 .catch((err) => console.log(err))

//             const rawResponse = await fetch('https://urbj1ulno3.execute-api.us-east-1.amazonaws.com/Dev/requestJob', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'authorizationToken': jwt

//                 },
//                 body: JSON.stringify({
//                         category: category,
//                         subcategory: subcategory,
//                         schedule_date: schedule_date,
//                         duration: duration,
//                         hasDuration: hasDuration,
//                         asap: asap,
//                     }),

//             });

//             const content = await rawResponse.json();

//                 var data = {
//                        category: category,
//                         subcategory: subcategory,
//                         schedule_date: schedule_date,
//                         duration: duration,
//                         hasDuration: hasDuration,
//                         asap: asap,
//                 }
//                 dispatch(addJobRequestRejected(data))
           

//             // this.uploadToStorage

//             console.log(content);


//         } catch (err) {
//             dispatch(addJobRequestRejected(err))

//         }
//     }
// }
