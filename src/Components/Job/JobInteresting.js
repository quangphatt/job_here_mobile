import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Loading, Pagination } from '@Components';
import { JobItem } from '@Components/Job';
import { useTranslation } from 'react-i18next';
import { dropdownBusiness, jobBusiness } from '@Business';

const JobInteresting = () => {
  const { t } = useTranslation();
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [stateData, setStateData] = useState({
    jobData: [],
    loading: false,
    unitDropdown: [],
    totalJob: 0
  });

  const getData = async (page, size) => {
    if (stateData.unitDropdown.length === 0) {
      await getUnitDropdown();
    }
    let result = await jobBusiness.getListJobInteresting(page, size);
    if (result.data.httpCode === 200) {
      if (stateData.totalJob !== result.data.objectData.totalRecord) {
        stateData.totalJob = result.data.objectData.totalRecord;
      }
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

  const renderItem = ({ item }) => {
    return (
      <View.Col style={{ width: '100%', paddingHorizontal: 10 }}>
        <JobItem jobData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col style={{ paddingVertical: 10 }}>
      <Text.H3_Bold secondary style={{ paddingLeft: 10 }}>
        {t('jh.interestingJob')}
      </Text.H3_Bold>
      <Pagination
        listData={stateData.jobData}
        renderItem={renderItem}
        getData={getData}
        dataLength={stateData.totalJob}
        singlePage
      />
    </View.Col>
  );
};

export default JobInteresting;
