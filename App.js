import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withOAuth } from "aws-amplify-react-native";
import { Provider } from 'react-redux';


import AppNavigator from './navigation/AppNavigator';
import store from './Reducers/index'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const {
      oAuthUser: user,
      oAuthError: error,
      facebookSignIn,
      googleSignIn,
      signOut,
    } = this.props;

    const screenProps = {
      facebookSignIn,
      googleSignIn,
      signOut,
      user
    }
    return(
      <Provider store={store}>
        <AppNavigator screenProps={screenProps}/>
      </Provider>
    )

  }
}


export default withOAuth(App);



