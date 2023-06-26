import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Common } from '@Components';
import { JobNew, JobInteresting, JobByIndustry } from '@Components/Job';
import { CompanyTop } from '@Components/Company';
import { openDrawer, navigate } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import Theme from '@Theme';

const HomeScreen = () => {
  const { t } = useTranslation();

  const onPressSearch = () => {
    navigate('SearchJobScreen', { isBack: true });
  };

  return (
    <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1 }}>
      <Common.Header
        title={'Job Here'}
        iconLeft={'menu'}
        actionLeft={openDrawer}
        iconRight={'search-sharp'}
        actionRight={onPressSearch}
      />
      <View.Col>
        <JobNew />
        <JobInteresting />
        <JobByIndustry />
        <CompanyTop />
      </View.Col>
    </ScrollView>
  );
};

export default HomeScreen;
