import React from 'react';
import { View, Text, Common } from '@Components';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';

const TermOfServiceScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Common.Header title={t('jh.termOfService')} actionLeft={goBack} />
      <Text.Body secondary>TermOfServiceScreen</Text.Body>
    </View.Col>
  );
};

export default TermOfServiceScreen;
