import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Common } from '@Components';
import { JobNew } from '@Components/Job';
import { openDrawer, navigate } from '@NavigationAction';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t } = useTranslation();

  const onPressSearch = () => {
    navigate('SearchJobScreen');
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Common.Header
        title={'Job Here'}
        iconLeft={'menu'}
        actionLeft={openDrawer}
        iconRight={'search-sharp'}
        actionRight={onPressSearch}
      />
      <View.Col>
        <JobNew />
      </View.Col>
    </ScrollView>
  );
};

export default HomeScreen;
