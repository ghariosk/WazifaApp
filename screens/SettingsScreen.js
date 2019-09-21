import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {Button} from 'react-native';
import {Hub} from 'aws-amplify'
import { AsyncStorage } from 'react-native';

export default class SettingsScreen extends React.Component {
	constructor(props){
		super(props)
		this.state= {
			signedOut: false

		}
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
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render() {
  	return(
  		<Button title="Sign Out" onPress={this.SignOut.bind(this)}/>
  	)
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
