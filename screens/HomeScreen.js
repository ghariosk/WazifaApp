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
          image: require('../assets/icons/icons8-plumbing-100.png'),
          subcategory: "Plumbing"
        },
         {
          id: 6,
          text: "Carpentry",
          image: require('../assets/icons/icons8-saw-blade-100.png'),
          subcategory: 'carpentry'
        }

      ]
    };
    this.ws = new WebSocket("wss://mcgoyg3p6i.execute-api.us-east-1.amazonaws.com/Dev")
  }


 async componentDidMount() {


const credentials = await Auth.currentCredentials();

const essentials = await  Auth.essentialCredentials(credentials)
console.log(essentials)
   var s3 = new AWS.S3({apiVersion: '2006-03-01', region:'eu-central-1', credentials:Auth.essentialCredentials(credentials)});

  // s3.listBuckets(function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });

  var params = {Bucket: 'wazifas3bucket-dev', Key: 'public/1/1.jpeg'};
  var url = s3.getSignedUrl('getObject', params);
  console.log('The URL is', url);
  



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




