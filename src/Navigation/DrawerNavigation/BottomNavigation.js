import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobHereNavigation from './JobHereNavigation';
import MessageScreen from '@Screen/Message/MessageScreen';
import NotificationScreen from '@Screen/Notification/NotificationScreen';
import PersonalScreen from '@Screen/User/PersonalScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'JobHereNavigation'}
    >
      <Tab.Screen name="JobHereNavigation" component={JobHereNavigation} />
      <Tab.Screen name="MessageScreen" component={MessageScreen} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
      <Tab.Screen name="PersonalScreen" component={PersonalScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
