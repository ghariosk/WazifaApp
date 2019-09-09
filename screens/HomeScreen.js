import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  ListView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Tiles from "../components/Tiles2";
import {Auth} from 'aws-amplify'
import AWS from 'aws-sdk'
import awsmobile from '../aws-exports'

import { MonoText } from '../components/StyledText';
var {height, width} = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [
        {
          id: 1,
          text: "Air Conditioning",
          image: require('../assets/icons/icons8-air-conditioner-100.png'),
          subcategory: "ac"
        },
         {
          id: 2,
          text: "Cleaning",
          image: require('../assets/icons/icons8-broom-100.png'),
          subcategory: "cleaning"
        },
         {
          id: 3,
          text: "Computer Repair",
          image: require('../assets/icons/icons8-computer-support-100.png'),
          subcategory: "computer"
        },
         {
          id: 4,
          text: "Electricity",
          image: require('../assets/icons/icons8-electricity-100.png'),
          subcategory: "electricity"
        },
         {
          id: 5,
          text: "Plumbing",
          image: require('../assets/icons/icons8-plumbing-100.png')
        },
         {
          id: 6,
          text: "Carpentry",
          image: require('../assets/icons/icons8-saw-blade-100.png')
        }

      ]
    };
    this.ws = new WebSocket("wss://mcgoyg3p6i.execute-api.us-east-1.amazonaws.com/Dev")
  }


  

//   componentDidMount() {
    
//     this.ws.onopen = () => {
//       console.log("Connection Openened")
//     }
//     this.ws.onmessage = e => {
//     console.log("Message is" , e.data)

//     // const data = JSON.parse(e)
//     const data = e.data

//     this.setState({
//       messages: [...this.state.messages,data]
//     })

//     var localNot = {
//       title: "Hello",
//       body: e.data,
//       _displayInForeground: true,
//       sound: true
      
//     } 
//     try {

//     Notifications.presentLocalNotificationAsync(localNot)
//     } catch (e) {
//       console.log(e)
//     }

//     this.ws.onerror = e => {
//   // an error occurred
//   console.log(e.message);
// };

// this.ws.onclose = e => {
//   // connection closed
//   console.log(e.code, e.reason);
//   alert(e.reason)
// };
//   }
//   }

 async componentDidMount() {
//   var identityPoolId = awsmobile.aws_cognito_identity_pool_id
//   var userPoolId = awsmobile.aws_user_pools_id
//   var region = awsmobile.aws_project_region

//   let jwt
//   let id
//    Auth.currentSession().then(res=>{
//     let accessToken = res.getAccessToken()
//   jwt = accessToken.getJwtToken()
//   id = res.id
//   //You can print them to see the full objects
//   })
//   var params = {}
//   params.IdentityPoolId= identityPoolId
//   params[`cognito-idp.${region}.amazonaws.com/${userPoolId}`] = jwt

//   params.IdentityId = id

  
//     // var params = {
//     //   IdentityPoolId: identityPoolId ,
//     //   Logins: {
//     //       {`cognito-idp.${region}.amazonaws.com/${userPoolId}`}: jwt 

//     // }

  

// AWS.config.credentials = new AWS.CognitoIdentityCredentials(params, {region: 'eu-central-1'})

//    AWS.config.credentials.clearCachedId();

//     AWS.config.credentials.get(function(err) {
//                 if (err){
//                     console.log(err.message);
//                 }
//                 else {
//                     console.log('AWS Access Key: '+ AWS.config.credentials.accessKeyId);
//                     console.log('AWS Secret Key: '+ AWS.config.credentials.secretAccessKey);
//                     console.log('AWS Session Token: '+ AWS.config.credentials.sessionToken);
//                 }
//     });


const credentials = await Auth.currentCredentials();



  var s3 = new AWS.S3({apiVersion: '2006-03-01', region:'eu-central-1', credentials:Auth.essentialCredentials(credentials)});


  s3.listBuckets(function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
  



}


  

  render () {


    return (
       <LinearGradient
        colors={["#94bbe9",'#eeaeca', '#94bbe9']}
        style={{flex: 1}}
      >
       <View style={{ flex: 1 }}>
        <Tiles
          rows={3}
          dataSource={this.state.dataSource}
        />
       
      </View>

      </LinearGradient>


   

    );
  } 
}

// HomeScreen.navigationOptions = {
//   header: null,
// };

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  item: {
    backgroundColor: 'red',
    width: 200,
    height: 200
  }
});


const Tile = ({text}) => {
  return (
    <View style={styles.item}>
      <Text>{text}</Text>
      <Text> Hello </Text>
    </View>
  );
}

