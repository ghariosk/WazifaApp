import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, SafeAreaView, StatusBar , Modal} from 'react-native';
import { default as awsConfig } from "../aws-exports";
import Amplify, { Auth, Hub } from 'aws-amplify';
import { Input, Button } from "react-native-elements";

Amplify.configure(awsConfig);

export default class SignUpScreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			 email: '',
      		password: '',
      		confirmPassword: '',
      		modalVisible: false

		}
	}

	handleSignUp = () => {
  // alert(JSON.stringify(this.state));
  const { email, password, confirmPassword } = this.state;
  // Make sure passwords match
  if (password === confirmPassword) {
    Auth.signUp({
      username: email,
      password,
      attributes: { email,
      	name: "Karl Gharios",
        type: "User"
       }
        
      })
      // On success, show Confirmation Code Modal
      .then(() => this.setState({ modalVisible: true }))
      // On failure, display error in console
      .catch(err => console.log(err));
  } else {
    alert('Passwords do not match.');
  }
}

handleSignIn = () => {
  const { email, password } = this.state;
  console.log("Hello Sign In")
  Auth.signIn(email, password)
    // If we are successful, navigate to Home screen
    .then(user => this.props.navigation.navigate('AuthLoading'))
    // On failure, display error in console
    .catch(err => console.log(err));
}

handleConfirmationCode = (signInAfter) => {
  const { email, confirmationCode } = this.state;
  Auth.confirmSignUp(email, confirmationCode, {})
    .then(() => {
      this.setState({ modalVisible: false });
      signInAfter()
      
    })
    .catch(err => console.log(err));
  }

	componentDidMount() {
		console.log('Sign Up Screen')
	}

	render() {
		return (
			 <View style={styles.container}>
        <Text>Welcome to MyAlligatorFace!</Text>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ email: value })
          }
          placeholder="my@email.com"
        />
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.password to the value in this Input box
            (value) => this.setState({ password: value })
          }
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.confirmPassword to the value in this Input box
            (value) => this.setState({ confirmPassword: value })
          }
          placeholder="p@ssw0rd123"
          secureTextEntry
        />
        <Button
          title='Submit'
          onPress={ this.handleSignUp }
        />

            <Modal
          visible={this.state.modalVisible}
        >
          <View
            style={styles.container}
          >
            <Input
              label="Confirmation Code"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })
              }
            />
            <Button
              title='Submit'
              onPress={() => this.handleConfirmationCode(this.handleSignIn) }
            />
          </View>
        </Modal>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});