import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommonNavigation from '@Navigation/CommonNavigation/CommonNavigation';
import AppliedJobScreen from '@Screen/Job/AppliedJobScreen';
import SavedJobScreen from '@Screen/Job/SavedJobScreen';
import CVManageScreen from '@Screen/CV/CVManageScreen';
import ChangePasswordScreen from '@Screen/User/ChangePasswordScreen';
import UpdateUserInfoScreen from '@Screen/User/UpdateUserInfoScreen';

const Stack = createStackNavigator();

const JobHereNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="CommonNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CommonNavigation" component={CommonNavigation} />
      <Stack.Screen name="AppliedJobScreen" component={AppliedJobScreen} />
      <Stack.Screen name="SavedJobScreen" component={SavedJobScreen} />
      <Stack.Screen name="CVManageScreen" component={CVManageScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="UpdateUserInfoScreen"
        component={UpdateUserInfoScreen}
      />
    </Stack.Navigator>
  );
};

export default JobHereNavigation;
