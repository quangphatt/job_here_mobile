import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { View, Text, Common } from '@Components';
import { JobItem } from '@Components/Job';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';

const CompanyHeader = ({ companyData }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <View.Col style={{ paddingHorizontal: 10 }}>
      <View.Col style={styles.group}>
        <View.Col style={styles.group_label}>
          <Text.BodyBold secondary fontSize={17}>
            {t('jh.companyIntroduction')}
          </Text.BodyBold>
        </View.Col>
        <View.Col>
          <Common.RenderHTMLJobHere
            contentWidth={width}
            source={{ html: companyData.description || '' }}
          />
        </View.Col>
      </View.Col>
      {(companyData?.companyJobs?.length ?? 0) > 0 && (
        <View.Col style={styles.group}>
          <View.Col style={styles.group_label}>
            <Text.BodyBold secondary fontSize={17}>
              {t('jh.recruit')}
            </Text.BodyBold>
          </View.Col>
          <View.Col>
            {_.map(companyData.companyJobs, item => (
              <JobItem key={item.jobId} jobData={item} />
            ))}
          </View.Col>
        </View.Col>
      )}
    </View.Col>
  );
};

const styles = StyleSheet.create({
  group: {
    backgroundColor: Theme.colors.white_color,
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  group_label: {
    borderLeftWidth: 5,
    borderColor: Theme.colors.primary_color,
    paddingLeft: 10,
    marginBottom: 5
  }
});

export default CompanyHeader;
