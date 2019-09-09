
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import SignUpBusinessScreen from '../screens/SignUpBusinessScreen'

const AuthStack = createStackNavigator(
  {
    signIn: {
		screen: SignInScreen,
		header: null,
		navigationOptions: () => ({
      		title: 'Sign In',
      		header:null
    	}),
	},
	signUp: {
		screen: SignUpScreen,
		header: null,
		navigationOptions: () => ({
      		title: 'Sign Up',
      		header: null
    	}),
	}, 
	signUpBusiness: {
		screen: SignUpBusinessScreen,
		navigationOptions: () => ({
      		title: 'Sign Up as a Business',
    	}),
	}
  }
);


export default AuthStack