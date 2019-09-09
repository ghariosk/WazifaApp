import React from 'react' 
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample'

export default class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
		}



	}

	async componentDidMount () {
		Auth.currentAuthenticatedUser()
			.then(()=>{
				Auth.currentUserInfo()
					.then((res)=> {
						console.log(res)
					
						if (res.attributes["custom:type"] == "Business") {
						

							this.props.navigation.navigate('Business')
						} else {
	
							this.props.navigation.navigate('Main')
						}
					}).catch((err)=> {
						alert(err)
					})
				
			})
			.catch((err) => {
				console.log(err)
				var user =  Auth.currentUserInfo()
				console.log(user)
				this.props.navigation.navigate('Auth')

			})


	

	}



	render () {
		return (
			<ActivityIndicatorExample/>
		)
	}
}