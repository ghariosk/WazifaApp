import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AuthNavigator from './AuthNavigator'
import { Auth} from 'aws-amplify'
import BusinessMainTabNavigator from './BusinessMainTabNavigator'



export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    Main: MainTabNavigator,
    Business: BusinessMainTabNavigator,
    initialRouteName: 'AuthLoading'
  })
);
