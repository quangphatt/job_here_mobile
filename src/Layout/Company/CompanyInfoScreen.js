import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button, Icon, Common, Image } from '@Components';
import { JobItem } from '@Components/Job';
import { useTranslation } from 'react-i18next';

const _testData_companyJob = [
  {
    applicationId: 13,
    jobId: 19,
    jobName: 'Automation Tester',
    companyId: 14,
    companyName: 'Công ty KMS Solution',
    avatarUrl:
      'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672474639399-download.png',
    salaryMin: 1000,
    salaryMax: 1200,
    unit: 'ENGLISH',
    cityId: 1,
    createdDate: '2022-11-21T21:38:12.196+07:00',
    viewed: true,
    unitName: '$'
  },
  {
    applicationId: 4,
    jobId: 5,
    jobName: 'FullStack C# .Net',
    companyId: 13,
    companyName: 'Công ty FPT Software',
    avatarUrl:
      'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672475066068-download_(1).png',
    salaryMin: 1000,
    salaryMax: 1000,
    unit: 'VIETNAM',
    cityId: 1,
    createdDate: '2022-11-13T23:47:39.098+07:00',
    viewed: true,
    unitName: 'Million VND'
  },
  {
    applicationId: 8,
    jobId: 7,
    jobName: 'FullStack React',
    companyId: 13,
    companyName: 'Công ty FPT Software',
    avatarUrl:
      'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672475066068-download_(1).png',
    salaryMin: 1000,
    salaryMax: 1000,
    unit: 'VIETNAM',
    cityId: 1,
    createdDate: '2022-11-13T16:51:16.866+07:00',
    unitName: 'Million VND'
  }
];

const CompanyInfoScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
      {_.map(_testData_companyJob, item => (
        <JobItem key={item.jobId} jobData={item} />
      ))}
    </View.Col>
  );
};

export default CompanyInfoScreen;
