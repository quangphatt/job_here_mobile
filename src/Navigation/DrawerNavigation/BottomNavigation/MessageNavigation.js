import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessageListScreen from '@Screen/Message/MessageListScreen';
import MessageScreen from '@Screen/Message/MessageScreen';

const Stack = createStackNavigator();

const MessageNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="MessageListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MessageListScreen" component={MessageListScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default MessageNavigation;
