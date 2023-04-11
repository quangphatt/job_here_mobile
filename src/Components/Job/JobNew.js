import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Pagination } from '@Components';
import { JobHeader } from '@Components/Job';
import { useTranslation } from 'react-i18next';
import { jobBusiness, authBusiness } from '@Business';
import { useSelector } from 'react-redux';
import { AuthContext } from '@Config/Provider/AuthProvider';
import { logOut } from '@ReduxSlice/AuthenticationSlice';
import { changeHeaderToken } from '@ReduxSlice/HeaderRequestSlice';
import { useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';

const { width } = Dimensions.get('window');

const JobNew = () => {
  const { t } = useTranslation();
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [stateData, setStateData] = useState({
    jobData: []
  });
  const authContext = useContext(AuthContext);
  let isSignIn = authContext?.authState?.authenticated ?? false;
  const headers = useSelector((state) => state.HeaderRequest.headers);
  const dispatch = useDispatch();

  const getData = async (page, size) => {
    if (isSignIn) {
      let session = await authBusiness.getSessionInfo();
      if (session.data.httpCode === 401) {
        const value = await Keychain.getGenericPassword();
        const jwt = JSON.parse(value.password);
        const { email, password, refreshToken } = jwt;
        let _refreshToken = await authBusiness.refreshToken(
          email,
          password,
          refreshToken
        );
        if (_refreshToken.data.httpCode === 200) {
          const { token, refreshToken } = _refreshToken.data.objectData;

          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              token,
              refreshToken,
              email,
              password
            })
          );

          dispatch(changeHeaderToken(token));
        } else {
          dispatch(logOut());
          authContext.logOut();
        }
      }
    }

    let result = await jobBusiness.getListNewJob();
    if (result.data.httpCode === 200) {
      stateData.jobData = result?.data?.objectData ?? [];
    }
    setLastUpdate(moment().format('x'));
  };

  const renderItem = ({ item, index }) => {
    return (
      <View.Col key={index} style={{ width }}>
        <JobHeader jobData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col style={{ paddingVertical: 10 }}>
      <Text.H3_Bold secondary style={{ paddingLeft: 10 }}>
        {t('jh.newJob')}
      </Text.H3_Bold>
      <Pagination
        listData={stateData.jobData}
        renderItem={renderItem}
        getData={getData}
        dataLength={stateData.jobData.length}
      />
    </View.Col>
  );
};

export default JobNew;
