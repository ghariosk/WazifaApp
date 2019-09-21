import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {Auth} from 'aws-amplify'
import { AsyncStorage } from 'react-native';

export default async function registerForNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let notification_token = await Notifications.getExpoPushTokenAsync();

 

  var tokenSaved = await AsyncStorage.getItem('registeredForNotifications')
  console.log(tokenSaved)
  if (tokenSaved !== "true") {

    try {
       let jwt
      await Auth.currentSession().then(res=>{
      let idToken = res.idToken
      jwt = idToken.getJwtToken()
      //You can print them to see the full objects
      })
      let type 
      await Auth.currentUserInfo().then((res)=>{
        type = res.attributes["custom:type"]
      }).catch((err)=>{
        console.log(err)

      })
      const rawResponse = await fetch('https://urbj1ulno3.execute-api.us-east-1.amazonaws.com/Dev/saveNotificationToken', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': jwt

        },
        body: JSON.stringify(
          {
            notification_token: notification_token,
            type: type
        }),

      });
        const content = await rawResponse.json();

        console.log(content);
  
         

       try {
            await AsyncStorage.setItem('registeredForNotifications', 'true');
            console.log('token saved')
          } catch (error) {
          // Error saving data
          }
    } catch (err) {
        console.log("Error", err)
    }
  } else {
    console.log("Token is saved")
  }



  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return true
}