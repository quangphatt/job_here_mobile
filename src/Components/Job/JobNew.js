import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from '@Components';
import { JobHeader } from '@Components/Job';
import { useTranslation } from 'react-i18next';
import { jobBusiness, authBusiness } from '@Business';
import { useSelector } from 'react-redux';
import { AuthContext } from '@Config/Provider/AuthProvider';
import { logOut } from '@ReduxSlice/AuthenticationSlice';
import { changeHeaderToken } from '@ReduxSlice/HeaderRequestSlice';
import { useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import Slick from 'react-native-slick';
import _ from 'underscore';

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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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

  return (
    <View.Col style={{ paddingVertical: 10 }}>
      <Text.H3_Bold secondary style={{ paddingLeft: 10 }}>
        {t('jh.newJob')}
      </Text.H3_Bold>
      <Slick autoplay autoplayTimeout={8} showsPagination={false} height={240}>
        {_.map(stateData.jobData, (job) => (
          <View.Col key={job.jobId}>
            <JobHeader jobData={job} />
          </View.Col>
        ))}
      </Slick>
    </View.Col>
  );
};

export default JobNew;
