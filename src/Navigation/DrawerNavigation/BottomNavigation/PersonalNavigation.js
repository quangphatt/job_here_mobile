import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalScreen from '@Screen/User/PersonalScreen';
import ChangePasswordScreen from '@Screen/User/ChangePasswordScreen';
import UpdateUserInfoScreen from '@Screen/User/UpdateUserInfoScreen';
import TermOfServiceScreen from '@Screen/Common/TermOfServiceScreen';
import PrivacyPolicyScreen from '@Screen/Common/PrivacyPolicyScreen';
import AboutUsScreen from '@Screen/Common/AboutUsScreen';

const Stack = createStackNavigator();

const PersonalNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="PersonalScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PersonalScreen" component={PersonalScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="UpdateUserInfoScreen"
        component={UpdateUserInfoScreen}
      />
      <Stack.Screen
        name="TermOfServiceScreen"
        component={TermOfServiceScreen}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
    </Stack.Navigator>
  );
};

export default PersonalNavigation;
