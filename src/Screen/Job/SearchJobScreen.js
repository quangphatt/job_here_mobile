import React from 'react';
import { View, Text, Common } from '@Components';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';

const SearchJobScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Common.Header title={t('jh.searchJob')} actionLeft={goBack} />
      <Text.Body secondary>SearchJobScreen</Text.Body>
    </View.Col>
  );
};

export default SearchJobScreen;
