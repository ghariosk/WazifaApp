
import {Auth} from 'aws-amplify'
import AWS from 'aws-sdk'

export default updateWithIdentityPoolId = async (custom_type) => {
	var info = await Auth.currentUserInfo()


	var custom_type = await info.attributes['custom:type']
	const credentials = await Auth.currentCredentials();
	const {accessKeyId,secretAccessKey ,sessionToken} = await Auth.essentialCredentials(credentials)

var httpRequest = new AWS.HttpRequest("https://urbj1ulno3.execute-api.us-east-1.amazonaws.com/Dev/subAndIdUpdate", "us-east-1");

//REQUIRED
//Host & content type headers must be set
httpRequest.headers.host = "urbj1ulno3.execute-api.us-east-1.amazonaws.com"; //Host of the API being called
httpRequest.headers['Content-Type'] = "application/json; charset=utf-8";

// await AWS.config.update({
//   region: 'us-east-1',
//   //CognitoIdentityCredentials only needed if using Cognito. Use credentials specific to your usecase


// })

AWS.config.credentials = {
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	sessionToken: sessionToken
}

console.log(AWS.config.credentials)

httpRequest.method = "POST"; //Default is POST

httpRequest.body = JSON.stringify({type: custom_type});

// //Instruct cognito credentials to get access, secret and session keys (only needs to be done once on page load)
//   //Sign the request with the newly fetched credentials. All IAM Authorised API Gateway requests use the V4 signer
  var v4signer = new AWS.Signers.V4(httpRequest, "execute-api");
  v4signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
  
httpRequest.headers['Content-Type'] = "application/json; charset=utf-8";

 const rawResponse = await fetch(httpRequest.endpoint.href , {
        method: httpRequest.method,
        headers: httpRequest.headers,
        body: httpRequest.body
});



}