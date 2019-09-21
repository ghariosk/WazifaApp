import React from 'react' 
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../Actions/authActions';
import registerForNotifications from '../Functions/registerForNotifications'
import updateWithIdentityPoolId from '../Functions/updateWithIdentityPoolId'
import { Notifications } from 'expo';


 class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
		}



	}

	async componentDidMount () {
		// await this.props.getUser()
		// this.props.navigation.navigate('Main')
		Auth.currentAuthenticatedUser()
			.then((res)=>{
				console.log(res)
				Auth.currentUserInfo()
					.then((res)=> {


						registerForNotifications()
						updateWithIdentityPoolId()
						this._notificationSubscription = Notifications.addListener(this._handleNotification);
						// updateWithIdentityPoolId(res.attributes["custom:type"])
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