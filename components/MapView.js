import React from 'react';
import {Button, View,  Text, Image, SafeAreaView, StyleSheet} from 'react-native'
import MapView,{ Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';
var image = require('../assets/map-marker.png')
const MyMapView = (props) => {
	// constructor(props){
	// 	super(props)
	// 	this.state = {
	// 		region: props.region
	// 	}
	// }
	const latitudeDelta = 0.025
	const longitudeDelta = 0.025
	const region = props.region
    return (
    	<View style={{flex: 1}} > 
        <MapView
        	provider={PROVIDER_GOOGLE}
            style={{ flex: 1, position: 'relative' }}
            region={props.region}
            onRegionChangeComplete={(reg) => props.onRegionChange(reg)}
            >

          
      


        </MapView>
        	<View pointerEvents='none' style={styles.markerFixed}>
          <Image style={styles.marker} source={image} />
        </View>

         <View  style={styles.bottom}>
        <Button title="Confirm" onPress={()=> props.onConfirm()}/>
        </View>

        </View>
    )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  // markerFixed: {
  //   left: '50%',
  //   marginLeft: -24,
  //   marginTop: -48,
  //   position: 'absolute',
  //   top: '50%'

  // },
  markerFixed: {
  	position: 'absolute',
  	height: "100%",
  	width: "100%",
  	alignItems: 'center',
  	justifyContent: 'center'
  },
 
  marker: {
     height: 48,
    width: 48
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  },
bottom: {

  position: 'absolute',
  bottom: 0,
  width: "100%",
  alignItems: 'center'
  
}
})

export default MyMapView;



