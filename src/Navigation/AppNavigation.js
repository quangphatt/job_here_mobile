import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, isReadyRef } from '@NavigationAction';
import AuthenticationNavigation from './AuthenticationNavigation/AuthenticationNavigation';
import DrawerNavigation from './DrawerNavigation/DrawerNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const routeNameRef = useRef();

  const onReady = () => {
    isReadyRef.current = true;
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  const onStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
