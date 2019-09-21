import React, {Component} from 'react'
import Amplify, { Auth, Hub } from 'aws-amplify';
import {StyleSheet,StatusBar, AppState } from 'react-native';
import {Header, Label, Form, Item, Input, Content, Container, Button, Icon, Title , Text, View} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ActivityIndicatorExample from '../components/ActivityIndicatorExample'
import awsmobile from '../aws-exports'

export default class SignInScreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			message: this.props.navigation.getParam('message' , null),
			isLoading: false,
			transparent: 'transparent'


		}
		this._onAuthChange = this._onAuthChange.bind(this)

	}

	handleSignIn = () => {
		this.setState({isLoading: true})
  		const { email, password } = this.state;
  		Auth.signIn(email, password)
    // If we are successful, navigate to Home screen
    	.then(response => {
    	console.log(response)
    	 
    	})
    // On failure, display error in console
    	.catch(err => {
    		
    		this.setState({isLoading: false})
    	
    	});
	}

	socialLogin = (test) => {
	
		switch (test) {
			case 'Facebook':
				 Auth.federatedSignIn({provider: "Facebook"})
				 	.then((res)=> console.log(res))
				 	.catch((err) => alert(err))
				 break;
			case 'Google':
				Auth.federatedSignIn({provider: "Google"})
					 	.then((res)=> console.log(res))
					 	.catch((err) => alert(err))

			 default:
			 	break;
		}
	}
	_onAuthChange(data) {
		console.log(data.payload.event)
        switch (data.payload.event) {
            case 'signIn':
                this.setState({authState: 'signedIn', authData: data.payload.data});

                   this.props.navigation.navigate('AuthLoading')
                break;
            case 'signIn_failure':
                this.setState({authState: 'signIn', authData: null, authError: data.payload.data});
          
                const {code, message} = data.payload.data
                if (code == "UserLambdaValidationException") {
                	alert(message.split('error ')[1])
                } else if (code == "UserNotFoundException") {
                	alert("Wrong username or password")
                }
                // alert(err.message.split('error ')[1])

                break;
            case 'codeFlow':
            	this.setState({isLoading: true})
            default:
                break;
        }
	}

	componentDidMount() {
	
		    Hub.listen('auth', this._onAuthChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
		Hub.remove('auth', this._onAuthChange)
	}

	_handleAppStateChange = (nextAppState) => {
		console.log(nextAppState)
	}

	render() {
		if (!this.state.isLoading) {
		return (
			<View style={styles.container}>

			 <Text> {this.props.navigation.getParam('message' , null)} </Text>
			 

				<View style={{flex: 1}}>

				</View>
				<View style= {{flex: 3, width:"100%", alignItems: 'center'}}>
            	<Form style={styles.form}>
	            	<Item stackedLabel>
	            		<Label> Username </Label>
						<Input
						  
						  onChangeText={
						    // Set this.state.email to the value in this Input box
						    (value) => this.setState({ email: value })
						  }
					
						/>
					</Item>
					<Item stackedLabel>
					<Label> Password </Label>
					<Input
					  
					  onChangeText={
					    // Set this.state.email to the value in this Input box
					    (value) => this.setState({ password: value })
					  }
					
					  secureTextEntry
					/>
					</Item>
				
				
			
				
				</Form>

				<View style={styles.safeArea}>
				<Button
				style={{ alignSelf: null }}
				bordered
				rounded
				dark
				onPress={ this.handleSignIn }
				>
					<Text> Submit </Text>

				</Button>
				</View>

				
				</View>
				<View style={styles.safeArea}>
				<Button  style={styles.capturebtn}
				 rounded
				 
				 bordered 
				 onPress={()=> this.socialLogin('Facebook')}>

					<Icon name="logo-facebook"/> 

					<Text style={styles.buttonText}> Login with Facebook</Text>

				</Button>
				</View>
				<View style={styles.safeArea}>
				<Button style={styles.capturebtn} danger rounded bordered onPress={() => this.socialLogin('Google')}>
					<Icon style={styles.buttonGoogle} name="logo-google"/>
					<Text style={styles.buttonText}> Login with Google </Text>
				</Button>
				</View>

				<View style={styles.safeArea}>
            	<Button onPress={this.props.screenProps.signOut}>
            		<Text> Sign Out </Text>
            	</Button>
            	</View>
            	<View style={styles.safeArea}>
            	<Button transparent title="Sign Up as a User" onPress={()=> this.props.navigation.navigate("signUp")}>
            		<Text> Sign Up as a User </Text>
            	</Button>
            	</View>
            	<View style={styles.safeArea}>

            	<Button onPress={()=> this.props.navigation.navigate("signUpBusiness", {message:"Hello"})}>
            		<Text> Sign Up as a Business </Text>
            	</Button>
            	</View>

			
				

			 </View>




		)
		} else {
			return (
				<ActivityIndicatorExample/>
		)
		}
	}
}


const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	alignItems: 'center',
  	flexDirection: 'column'
  },
  safeArea: {
    flex: 1, flexDirection: 'row'
  },
  capturebtn:{
    elevation:0,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
  	alignSelf: 'center'
  },
  buttonGoogle:{
  	color: 'red'
  }, 
  form: {
 	width: "100%"
  }
});

