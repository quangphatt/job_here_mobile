import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthenticationNavigation from '@Navigation/AuthenticationNavigation/AuthenticationNavigation';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import DrawerContent from './DrawerContent';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
  const token = useSelector((state) => state.Authentication.token);
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);

  const renderDrawerContent = (props) => {
    return <DrawerContent {...props} />;
  };

  let isSignIn = !!token && !!sessionInfo?.email;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerType: 'front',
        drawerStyle: { width: width / 1.5, maxWidth: 340 }
      }}
      drawerContent={renderDrawerContent}
      initialRouteName="AuthenticationNavigation"
      backBehavior="none"
    >
      {!isSignIn ? (
        <Drawer.Screen
          name="AuthenticationNavigation"
          component={AuthenticationNavigation}
        />
      ) : (
        <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
