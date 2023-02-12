import React from 'react';
import { View, Text, Common } from '@Components';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';

const CompanyListScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Common.Header title={t('jh.companyList')} actionLeft={goBack} />
      <Text.Body secondary>CompanyListScreen</Text.Body>
    </View.Col>
  );
};

export default CompanyListScreen;
