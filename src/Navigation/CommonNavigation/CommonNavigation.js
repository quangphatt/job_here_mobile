import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@Screen/HomeScreen';
import JobInfoScreen from '@Screen/Job/JobInfoScreen';
import SearchJobScreen from '@Screen/Job/SearchJobScreen';
import CompanyInfoScreen from '@Screen/Company/CompanyInfoScreen';
import CompanyListScreen from '@Screen/Company/CompanyListScreen';
import CompanyReviewScreen from '@Screen/Company/CompanyReviewScreen';
import TermOfServiceScreen from '@Screen/Common/TermOfServiceScreen';

const Stack = createStackNavigator();

const CommonNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="JobInfoScreen" component={JobInfoScreen} />
      <Stack.Screen name="SearchJobScreen" component={SearchJobScreen} />
      <Stack.Screen name="CompanyInfoScreen" component={CompanyInfoScreen} />
      <Stack.Screen name="CompanyListScreen" component={CompanyListScreen} />
      <Stack.Screen
        name="CompanyReviewScreen"
        component={CompanyReviewScreen}
      />
      <Stack.Screen
        name="TermOfServiceScreen"
        component={TermOfServiceScreen}
      />
    </Stack.Navigator>
  );
};

export default CommonNavigation;
