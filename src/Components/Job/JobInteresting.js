import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text } from '@Components';
import { JobItem } from '@Components/Job';
import { useTranslation } from 'react-i18next';
import { dropdownBusiness, jobBusiness } from '@Business';
import Slick from 'react-native-slick';
import _ from 'underscore';

const SIZE = 8;

const JobInteresting = () => {
  const { t } = useTranslation();
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [stateData, setStateData] = useState({
    jobData: [],
    unitDropdown: []
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (stateData.unitDropdown.length === 0) {
      await getUnitDropdown();
    }
    let result = await jobBusiness.getListJobInteresting(0, SIZE);
    if (result.data.httpCode === 200) {
      let listJob = result?.data?.objectData?.pageData ?? [];
      if (listJob.length > 0) {
        for (let i = 0; i < listJob.length; i++) {
          listJob[i].unitName = stateData.unitDropdown.find(
            (x) => x.unit === listJob[i].unit
          ).unitName;
        }
        stateData.jobData = listJob;
        setLastUpdate(moment().format('x'));
      }
    }
  };

  const getUnitDropdown = async () => {
    let _unitname = await dropdownBusiness.getUnitDropdown();
    if (_unitname.data.httpCode === 200) {
      stateData.unitDropdown = _unitname.data.objectData;
    }
  };

  if (!stateData.jobData.length) return null;

  return (
    <View.Col style={{ paddingVertical: 10 }}>
      <Text.H3_Bold secondary style={{ paddingLeft: 10 }}>
        {t('jh.interestingJob')}
      </Text.H3_Bold>
      <Slick autoplay autoplayTimeout={8} showsPagination={false} height={210}>
        {_.map(stateData.jobData, (job) => (
          <View.Col key={job.jobId} style={{ paddingHorizontal: 10 }}>
            <JobItem jobData={job} />
          </View.Col>
        ))}
      </Slick>
    </View.Col>
  );
};

export default JobInteresting;
