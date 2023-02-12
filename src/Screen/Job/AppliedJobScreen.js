import React from 'react';
import { View, Text, Common } from '@Components';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';

const AppliedJobScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Common.Header title={t('jh.appliedJob')} actionLeft={goBack} />
      <Text.Body secondary>AppliedJobScreen</Text.Body>
    </View.Col>
  );
};

export default AppliedJobScreen;
