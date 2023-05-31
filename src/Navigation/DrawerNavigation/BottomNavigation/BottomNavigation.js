import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@Screen/HomeScreen';
import JobHereNavigation from './JobHereNavigation';
import MessageNavigation from './MessageNavigation';
import NotificationScreen from '@Screen/Notification/NotificationScreen';
import PersonalNavigation from './PersonalNavigation';
import Tabbar from './Tabbar/Tabbar';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const renderTabbar = (props) => {
    return <Tabbar {...props} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'JobHereNavigation'}
      tabBar={renderTabbar}
    >
      <Tab.Screen name="JobHereNavigation" component={JobHereNavigation} />
      <Tab.Screen name="MessageNavigation" component={MessageNavigation} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
      <Tab.Screen name="PersonalNavigation" component={PersonalNavigation} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
