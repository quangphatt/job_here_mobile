import React, { useCallback, useEffect, useContext } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AuthenticationNavigation from '@Navigation/AuthenticationNavigation/AuthenticationNavigation';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import DrawerContent from './DrawerContent';
import { AuthContext } from '@Config/Provider/AuthProvider';
import * as Keychain from 'react-native-keychain';
import { GetAllSavedJob } from '@ReduxSlice/SavedJobSlice';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
  const dispatch = useDispatch();
  const savedJobList =
    useSelector((state) => state.SavedJob.listSavedJob) || [];
  const authContext = useContext(AuthContext);
  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        ...authContext.authState,
        token: jwt.token || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null
      });
    } catch (error) {
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        token: null,
        refreshToken: null,
        authenticated: false,
        email: '',
        password: ''
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  let isSignIn = authContext?.authState?.authenticated;
  if (isSignIn && savedJobList.length === 0) {
    dispatch(GetAllSavedJob());
  }

  const renderDrawerContent = (props) => {
    return <DrawerContent {...props} isSignIn={isSignIn} />;
  };

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
