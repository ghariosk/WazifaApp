import React, {Component} from 'react'
import {Platform,Keyboard, KeyboardAvoidingView, View, StyleSheet, Text, ScrollView, SafeAreaView, StatusBar , Modal} from 'react-native';
import { default as awsConfig } from "../aws-exports";
import Amplify, { Auth, Hub } from 'aws-amplify';
import { Input, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Demo from '../components/Demo'
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
        phone_number: '+9613795112',

		}
	}

	handleSignUp = () => {
  // alert(JSON.stringify(this.state));
  const { email, password, confirmPassword, phone_number, name } = this.state;
  var params
  // Make sure passwords match
  if (password === confirmPassword) {

    if (!email || typeof(email) == "undefined" ) {

      params = {
        username: phone_number,
        password,
        attributes: {
          name,
          "custom:type": "Business"
         
        }
      }
          
    } else if (email) {

       params = {
        username: "karlito",
        phone_number: phone_number,
        password,
        attributes: {
          name,
          "custom:type": "Business",
          "email": email
         
      }

    }
  }

    Auth.signUp(params)
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

  componentWillUnmount() {

  }
	render() {
		return (
     
        
  
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      contentContainerStyle={styles.container2}>
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
          secureTextEntry
        />
        <Button
          title='Submit'
          onPress={ this.handleSignUp }
        />

 
        <Button 
          title="Go back" 
          onPress={() =>this.props.navigation.navigate('signIn', {message: "You registration is successful. \n We will be in contact shortly! "}) }/>


      </KeyboardAwareScrollView>
          

     

		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
  flex:1,
  justifyContent: 'center',
  alignItems: 'center'

  },
  shadow: {
    flex: 1,
   shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  }
});