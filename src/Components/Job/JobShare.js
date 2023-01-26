import React from 'react';
import { View, Text, Icon, Button } from '@Components';
import { useTranslation } from 'react-i18next';

const JobShare = ({ path = '' }) => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Text.Body secondary>JobShare</Text.Body>
    </View.Col>
  );
};

export default JobShare;
