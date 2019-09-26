import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, StyleSheet, Button, Modal, View} from 'react-native';
import {Hub} from 'aws-amplify'
import { AsyncStorage } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import MapContainer from '../containers/MapContainer';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class SettingsScreen extends React.Component {
	constructor(props){
		super(props)
		this.state= {
			signedOut: false,
			locationModalVisible: false,
			mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 1, longitudeDelta:1 },
		    locationResult: null,
		    location: {coords: { latitude: 37.78825, longitude: -122.4324}}

		}
	}

	componentDidMount() {
	
		this._getLocationAsync()

	}


	  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }
   try {
   let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
	} catch(err) {
		console.log(err)
	}
  
 };

	_handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
    console.log(this.state.mapRegion)
  };


	onRegionChange(region) {
	this.setState({ region });
	console.log(this.state.region)
	}

	_handleMarkerDrag = (e) => {
		var test = this.state.location
		test.coords = e.nativeEvent.coordinate

		console.log(test)


		this.setState({location: test })
	}

	SignOut = async () => {
		await AsyncStorage.removeItem('registeredForNotifications')

		const test = await AsyncStorage.getItem('registeredForNotifications')

		console.log(test)
	
		try {
		await this.props.screenProps.signOut()
			.then( this.setState({"signedOut": true}))

		if (this.state.signedOut) {
			this.props.navigation.navigate('AuthLoading')

		}
		} catch (err) {
			alert(err)
		}
	}

	_handleLocationPicked = (location) => {
		console.log(location)
	}
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render() {
  	return(
  		<View>
  		<Button title="Sign Out" onPress={this.SignOut.bind(this)}/>
  		<Button title="Location" onPress={() => this.setState({locationModalVisible: true})}/>

  		<Modal style={styles.container} visible={this.state.locationModalVisible}>
		<MapContainer
			onConfirm={async (coords) => {
				this.setState({locationModalVisible: false});
			    await this.setState({coords: coords});
			    console.log("Coords Have been confirmed ", this.state.coords)
			}
			}
			onPickLocation={(location) => this._handleLocationPicked }
			onMapPressBack={()=> {console.log('second hello') ;this.setState({locationModalVisible: false})}}
		/>
	

  		</Modal>

 
  		</View>
  	)
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
