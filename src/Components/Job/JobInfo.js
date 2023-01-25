import React from 'react';
import { View, Text, Icon, Button } from '@Components';
import { useTranslation } from 'react-i18next';

const JobInfo = ({ jobData }) => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Text.Body secondary>JobInfo</Text.Body>
    </View.Col>
  );
};

export default JobInfo;
