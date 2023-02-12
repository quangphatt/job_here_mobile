import React from 'react';
import { View, Text, Common } from '@Components';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';

const CVManageScreen = () => {
  const { t } = useTranslation();

  return (
    <View.Col>
      <Common.Header title={t('jh.cvManage')} actionLeft={goBack} />
      <Text.Body secondary>CVManageScreen</Text.Body>
    </View.Col>
  );
};

export default CVManageScreen;
