import React from 'react';
import { View, Text } from '@Components';
import { JobItem } from '@Components/Job';

const CompanyHeader = ({ companyData }) => {
  return (
    <View.Col style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
      {_.map(companyData.companyJobs, item => (
        <JobItem key={item.jobId} jobData={item} />
      ))}
    </View.Col>
  );
};

export default CompanyHeader;
