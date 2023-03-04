import React, { createContext, useState } from 'react';
import axios from 'axios';
import host from '@Config/Service/Host';
import { refreshTokenURL } from '@Config/Service/ConfigURL';
import * as Keychain from 'react-native-keychain';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { changeHeaderToken } from '@ReduxSlice/HeaderRequestSlice';
import { useDispatch } from 'react-redux';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState({
    token: null,
    refreshToken: null,
    authenticated: null,
    email: '',
    password: ''
  });

  const logOut = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      token: null,
      refreshToken: null,
      authenticated: false,
      email: '',
      password: ''
    });
  };

  const gettoken = () => {
    return authState.token;
  };

  const authAxios = axios.create({
    baseURL: host,
    headers: { refreshToken: `Bearer ${authState.refreshToken}` }
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${gettoken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest) => {
    const data = {
      email: authState.email,
      password: authState.password
    };

    const options = {
      method: 'POST',
      data,
      url: host + refreshTokenURL
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        const { token, refreshToken } = tokenRefreshResponse.data.objectData;
        failedRequest.response.config.headers.Authorization = 'Bearer ' + token;
        dispatch(changeHeaderToken(token));

        setAuthState({
          ...authState,
          token,
          refreshToken
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            token,
            refreshToken
          })
        );

        return Promise.resolve();
      })
      .catch((e) => {
        setAuthState({
          token: null,
          refreshToken: null,
          email: '',
          password: ''
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        logOut,
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
