import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button, Icon, Common } from '@Components';
import { JobHeader, JobInfo, JobShare } from '@Components/Job';
import { useTranslation } from 'react-i18next';
import Global from '@Global';

const _testData = {
  jobId: 24,
  jobName: 'Nhân viên giao hàng công ty',
  company: null,
  companyId: 49,
  companyName: 'Ninja Van',
  avatar:
    'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672475372653-512x512bb.jpg',
  description:
    '<p><strong>Bạn sẽ nhận các đơn hàng từ công ty để giao trong giờ hành chính</strong></p>',
  require: '<p><strong>Tốt nghiệp tối thiểu lớp 12</strong></p>',
  benefit: '<p><strong>Giờ giấc tự do</strong></p>',
  salaryMin: 10.0,
  salaryMax: 100.0,
  unit: 'ENGLISH',
  experiences: ['NO_EXPERIENCE'],
  jobTypes: ['PARTTIME', 'FULLTIME'],
  title: 'EMPLOYEE',
  jobSkills: [
    {
      skillId: 38,
      skillName: 'English'
    }
  ],
  startDate: '2022-12-28',
  endDate: '2023-01-28',
  cityId: 2,
  address: '49A Phan Bội Châu, Thành Thái, Quận 10',
  createdDate: '2022-12-29T21:21:36.691+07:00',
  gender: 'MALE',
  amount: 10,
  active: true,
  unitName: '$',
  experienceNames: [
    {
      experience: 'NO_EXPERIENCE',
      experienceName: 'No Experience'
    }
  ],
  jobTypeNames: [
    {
      jobType: 'PARTTIME',
      jobTypeName: 'Part-Time'
    },
    {
      jobType: 'FULLTIME',
      jobTypeName: 'Full-Time'
    }
  ],
  cityName: 'Ho Chi Minh',
  titleName: 'Employee',
  genderName: 'Male'
};

const JobInfoScreen = () => {
  const [jobData, setJobData] = useState(_testData);
  const { t } = useTranslation();

  const onPressBack = () => {};

  const onPressShare = () => {};

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Common.Header
        title={jobData.jobName}
        actionLeft={onPressBack}
        iconRight={'share-social'}
        actionRight={onPressShare}
      />
      <JobHeader jobData={jobData} />
      <JobInfo jobData={jobData} />
    </ScrollView>
  );
};

export default JobInfoScreen;
