import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@Screen/Authentication/SplashScreen';
import SignInScreen from '@Screen/Authentication/SignInScreen';
import SignUpScreen from '@Screen/Authentication/SignUpScreen';
import AuthenticationCodeScreen from '@Screen/Authentication/AuthenticationCodeScreen';
import CommonNavigation from '@Navigation/CommonNavigation/CommonNavigation';

const Stack = createStackNavigator();

const AuthenticationNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="CommonAppNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="AuthenticationCodeScreen"
        component={AuthenticationCodeScreen}
      />
      <Stack.Screen name="CommonAppNavigation" component={CommonNavigation} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigation;
