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
			 email: 'karlgharios@hotmail.com',
      	password: 'jesuisla45',
      	confirmPassword: 'jesuisla45',
      	confirmModalVisible: false,
        verifyModalVisible: false,
        name: 'Karl G',
        phone_number: '+9613244575'

		}
	}

	handleSignUp = () => {
  // alert(JSON.stringify(this.state));
  const { email, password, confirmPassword, phone_number, name } = this.state;
  // Make sure passwords match
  if (password === confirmPassword) {
    Auth.signUp({
      username: email,
      password,
      attributes: { 
        email,
        name,
        "custom:type": "Business",
        phone_number: phone_number,
        "custom:screened": "False"
       }
        
      })
      // On success, show Confirmation Code Modal
      .then(() => this.setState({ confirmModalVisible: true }))
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
    
    .then(user => {
      console.log(user)
      Auth.verifyCurrentUserAttribute('phone_number')
        .then((res) => console.log(res))
        .catch((err)=> alert(err))
      
    })
    // On failure, display error in console
    .catch(err => console.log(err));
}

  handleConfirmationCode = (signInAfter) => {
  const { email, confirmationCode } = this.state;
  Auth.confirmSignUp(email, confirmationCode, {})
    .then((user) => {
      console.log(user)
      signInAfter()
      this.setState({ confirmModalVisible: false });
      this.setState({verifyModalVisible: true})
      // 
      
      
    })
    .catch(err => console.log(err));
  }

  handleVerification = () => {
    const {email, phone_number_code} = this.state 
    Auth.verifyCurrentUserAttributeSubmit('phone_number',phone_number_code)
    .then(() => {
      this.setState({verifyModalVisible: false})
      Auth.signOut()
        .then(()=> {
          this.props.navigation.navigate('signIn', {message: "You registration is successful. \n We will be in contact shortly! "})
        })
        .catch((err)=> console.log(err))
      
    })
    .catch(err => console.log(err))
  }

	componentDidMount() {
		console.log('Sign Up Screen')
	}

	render() {
		return (
			 <ScrollView contentContainerStyle={styles.container}>
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
          label="Name"
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ name: value })
          }
          placeholder="Karim Hatem"
        />
        <Input
          label="Phone Number"
          keyboardType={'phone-pad'}
          onChangeText={
            // Set this.state.email to the value in this Input box
            (value) => this.setState({ phone_number: value })
          }
          keyboardShouldPersistTaps='handled'
          placeholder="Karim Hatem"
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
        visible={this.state.confirmModalVisible}
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
        <Modal
        visible={this.state.verifyModalVisible}
        >
            <View
            style={styles.container}
            >
            <Input
            label="Phone Number Verification Code"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={
            // Set this.state.confirmationCode to the value in this Input box
            (value) => this.setState({ phone_number_code: value })
            }
            />
            <Button
            title='Submit'
            onPress={() => this.handleVerification() }
            />
          </View>
        </Modal>
        <Text> {this.props.navigation.getParam('message' ,  null)} </Text>
      </ScrollView>
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