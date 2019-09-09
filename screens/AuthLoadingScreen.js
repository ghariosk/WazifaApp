import React from 'react' 
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../Actions/authActions';
import registerForNotifications from '../Functions/registerForNotifications'
import { Notifications } from 'expo';


 class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
		}



	}

	async componentDidMount () {
		
		await this.props.getUser()

		console.log("Hello", this.props.user)
		Auth.currentAuthenticatedUser()
			.then(()=>{
				Auth.currentUserInfo()
					.then((res)=> {
						registerForNotifications()
						this._notificationSubscription = Notifications.addListener(this._handleNotification);
					
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

	 _handleNotification = (notification) => {
    	alert(notification)
	  };


	render () {
		return (
			
			<ActivityIndicatorExample/>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state,
	loading: state.loading,
	error: state.error
})

const mapDispatchToProps = (dispatch) => ({
	getUser: () => dispatch(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)