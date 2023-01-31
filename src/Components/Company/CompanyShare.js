import React from 'react';
import { JobShare } from '@Components/Job';

const CompanyShare = ({ path = '' }) => {
  return <JobShare path={path} company />;
};

export default CompanyShare;
