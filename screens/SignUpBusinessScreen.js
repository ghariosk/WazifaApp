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
			 email: null,
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
      username: phone_number,
      password,
      attributes: {
        name,
        "custom:type": "Business",
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
  const { phone_number, confirmationCode } = this.state;
  Auth.confirmSignUp(phone_number, confirmationCode, {})
    .then((user) => {
      console.log(user)
      // signInAfter()
      this.setState({ confirmModalVisible: false });
      // this.setState({verifyModalVisible: true})
       this.props.navigation.navigate('signIn', {message: "You registration is successful. \n We will be in contact shortly! "})

      // 
      
      
    })
    .catch(err => console.log(err));
  }

  // handleVerification = () => {
  //   const {email, phone_number_code} = this.state 
  //   Auth.verifyCurrentUserAttributeSubmit('phone_number',phone_number_code)
  //   .then(() => {
  //     this.setState({verifyModalVisible: false})
  //     Auth.signOut()
  //       .then(()=> {
  //        
  //       })
  //       .catch((err)=> console.log(err))
      
  //   })
  //   .catch(err => console.log(err))
  // }

	componentDidMount() {
		console.log('Sign Up Screen')
	}

	render() {
		return (
			 <ScrollView contentContainerStyle={styles.container}>
      
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
          placeholder="Your name"
        />
          <Input
          label="Email (Optional)"
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
            onPress={() => this.handleConfirmationCode() }
            />
          </View>
        </Modal>
        <Button 
          title="Go back" 
          onPress={() =>this.props.navigation.navigate('signIn', {message: "You registration is successful. \n We will be in contact shortly! "}) }/>
  
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