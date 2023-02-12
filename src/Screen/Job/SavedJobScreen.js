import React from 'react';
import { View, Text, Common } from '@Components';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';

const SavedJobScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Common.Header title={t('jh.savedJob')} actionLeft={goBack} />
      <Text.Body secondary>SavedJobScreen</Text.Body>
    </View.Col>
  );
};

export default SavedJobScreen;
