import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Pagination } from '@Components';
import { JobHeader } from '@Components/Job';
import { useTranslation } from 'react-i18next';
import { jobBusiness } from '@Business';
import Theme from '@Theme';

const { width } = Dimensions.get('window');

const JobNew = () => {
  const { t } = useTranslation();
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [stateData, setStateData] = useState({
    jobData: []
  });

  const getData = async (page, size) => {
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
    <View.Col
      style={{ backgroundColor: Theme.colors.white_color, paddingVertical: 10 }}
    >
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
