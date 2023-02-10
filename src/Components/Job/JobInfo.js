import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { View, Text, Icon, Button, Image, Common } from '@Components';
import { TagList } from '@Components/Tag';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import salary_img from '@Assets/Images/salary.png';
import amount_img from '@Assets/Images/group.png';
import jobType_img from '@Assets/Images/work.png';
import level_img from '@Assets/Images/level.png';
import gender_img from '@Assets/Images/gender.png';
import experience_img from '@Assets/Images/experience.png';
import skill_img from '@Assets/Images/suitcase.png';
import region_img from '@Assets/Images/map.png';

const ICON_SIZE = 40;

const JobInfo = ({ jobData }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <View.Col
      style={{
        backgroundColor: Theme.colors.white_color,
        margin: 10,
        marginTop: 0,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.border_colors.primary_border_color
      }}
    >
      <View.Row
        style={{
          borderLeftWidth: 5,
          borderColor: Theme.colors.primary_color,
          paddingLeft: 10
        }}
      >
        <Text.H4_Bold fontSize={18} secondary>
          {t('jh.jobDetail')}
        </Text.H4_Bold>
      </View.Row>
      <View.Col style={styles.group}>
        <Text.BodyBold secondary style={styles.group_label}>
          {t('jh.commonInformation')}
        </Text.BodyBold>
        {(!!jobData.salaryMin || !!jobData.salaryMax) && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={salary_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.salary')}
              </Text.BodyBold>
              <Text.Body secondary>
                {jobData.salaryMin === jobData.salaryMax
                  ? jobData.salaryMin
                  : `${jobData.salaryMin} - ${jobData.salaryMax}`}{' '}
                {jobData.unitName}
              </Text.Body>
            </View.Col>
          </View.Row>
        )}
        {!!jobData.amount && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={amount_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.amount')}
              </Text.BodyBold>
              <Text.Body secondary>{jobData.amount}</Text.Body>
            </View.Col>
          </View.Row>
        )}
        {!!jobData.jobTypeNames && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={jobType_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.jobType')}
              </Text.BodyBold>
              <TagList
                tagData={_.map(jobData.jobTypeNames, (item) => ({
                  label: item.jobTypeName
                }))}
              />
            </View.Col>
          </View.Row>
        )}
        {!!jobData.titleName && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={level_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.level')}
              </Text.BodyBold>
              <Text.Body secondary>{jobData.titleName}</Text.Body>
            </View.Col>
          </View.Row>
        )}
        {!!jobData.genderName && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={gender_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.gender')}
              </Text.BodyBold>
              <Text.Body secondary>{jobData.genderName}</Text.Body>
            </View.Col>
          </View.Row>
        )}
        {!!jobData.experienceNames && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={experience_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.experience')}
              </Text.BodyBold>
              <TagList
                tagData={_.map(jobData.experienceNames, (item) => ({
                  label: item.experienceName
                }))}
              />
            </View.Col>
          </View.Row>
        )}
        {!!jobData.jobSkills && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={skill_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.skill')}
              </Text.BodyBold>
              <TagList
                tagData={_.map(jobData.jobSkills, (item) => ({
                  label: item.skillName
                }))}
              />
            </View.Col>
          </View.Row>
        )}
        {!!jobData.cityName && (
          <View.Row style={styles.infoItem}>
            <View.Col style={styles.infoItem_iconWrapper}>
              <Image.ImageCircle
                source={region_img}
                style={styles.infoItem_icon}
                size={ICON_SIZE}
              />
            </View.Col>
            <View.Col>
              <Text.BodyBold secondary style={styles.infoItem_label}>
                {t('jh.region')}
              </Text.BodyBold>
              <Text.Body secondary>{jobData.cityName}</Text.Body>
            </View.Col>
          </View.Row>
        )}
      </View.Col>
      <View.Col style={styles.group}>
        <Text.BodyBold secondary style={styles.group_label}>
          {t('jh.workAddress')}
        </Text.BodyBold>
        <Text.Body secondary style={{ marginTop: 5 }}>
          {jobData.address}
        </Text.Body>
      </View.Col>
      <View.Col style={{ marginTop: 10 }}>
        {!!jobData?.description && (
          <View.Col>
            <Text.H4_Bold secondary>{t('jh.jobDescription')}</Text.H4_Bold>
            <Common.RenderHTMLJobHere
              contentWidth={width}
              source={{ html: jobData.description || '' }}
            />
          </View.Col>
        )}
        {!!jobData.require && (
          <View.Col>
            <Text.H4_Bold secondary>{t('jh.require')}</Text.H4_Bold>
            <Common.RenderHTMLJobHere
              contentWidth={width}
              source={{ html: jobData.require || '' }}
            />
          </View.Col>
        )}
        {!!jobData.benefit && (
          <View.Col>
            <Text.H4_Bold secondary>{t('jh.benefit')}</Text.H4_Bold>
            <Common.RenderHTMLJobHere
              contentWidth={width}
              source={{ html: jobData.benefit || '' }}
            />
          </View.Col>
        )}
      </View.Col>
    </View.Col>
  );
};

const styles = StyleSheet.create({
  group: {
    backgroundColor: Theme.background_colors.box_background_color,
    marginTop: 10,
    padding: 10,
    borderRadius: 10
  },
  group_label: {
    fontSize: 16,
    textDecorationLine: 'underline'
  },
  infoItem: { alignItems: 'flex-start', marginTop: 10 },
  infoItem_iconWrapper: { paddingRight: 10, paddingTop: 4 },
  infoItem_icon: { padding: 8 },
  infoItem_label: { fontSize: 16 }
});

export default JobInfo;
