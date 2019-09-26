import React from 'react' 
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../Actions/authActions';
import { getJobs } from '../Actions/jobsActions'
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
		
		
		// this.props.navigation.navigate('Main')
		Auth.currentAuthenticatedUser()
			.then((res)=>{
				console.log(res)
				Auth.currentUserInfo()
					.then((res)=> {

						this.props.getJobs()
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
	user: state.auth.user,
	loading: state.auth.loading,
	error: state.auth.error,
	jobs: state.jobs
})

const mapDispatchToProps = (dispatch) => ({
	getUser: () => dispatch(getUser()),
	getJobs: () => dispatch(getJobs())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)