import React from 'react';
import {View, Text} from 'react-native';

import {
  LoginScreen,
  CadLinkAcessoScreen,
  ForgotPasswordScreen,
} from '../pages/auth';
import AppRouter from './app_router';
import {createStackNavigator} from '@react-navigation/stack';

function AuthRouter() {
  const Tab = createStackNavigator();

  return (
    <Tab.Navigator initialRouteName="Login" headerMode="none">
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Tab.Screen name="CadLinkAcesso" component={CadLinkAcessoScreen} />
      <Tab.Screen name="App" component={AppRouter} />
    </Tab.Navigator>
  );
}

export default AuthRouter;
