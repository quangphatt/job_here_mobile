import React from 'react';
import { View, Text, Icon, Button, Image } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { navigatePush } from '@NavigationAction';
import company_default_img from '@Assets/Images/company_default_img.jpg';

const JobHeader = ({ jobData, inJobScreen = false }) => {
  const { t } = useTranslation();
  let avatar =
    jobData.avatar || jobData.avatarUrl
      ? { uri: jobData.avatar || jobData.avatarUrl }
      : company_default_img;

  const onPressJobName = () => {
    navigatePush('JobInfoScreen', { jobId: jobData.jobId });
  };

  const onPressCompanyName = () => {};

  const onPressApply = () => {};

  const onPressSaveJob = () => {};

  return (
    <View.Col
      style={{
        backgroundColor: Theme.colors.white_color,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.border_colors.secondary_border_color
      }}
    >
      <View.Row>
        <View.Col style={{ padding: 10 }}>
          <Image.ImageCircle source={avatar} size={60} />
        </View.Col>
        <View.Col style={{ flex: 1 }}>
          <Button.ButtonPreventDouble
            onPress={onPressJobName}
            disabled={inJobScreen}
          >
            <Text.H3_Bold primary>{jobData.jobName}</Text.H3_Bold>
          </Button.ButtonPreventDouble>
          <Button.ButtonPreventDouble onPress={onPressCompanyName}>
            <Text.H4_Bold secondary>{jobData.companyName}</Text.H4_Bold>
          </Button.ButtonPreventDouble>
          <View.Row style={{ alignItems: 'center', marginTop: 3 }}>
            <Icon.VectorIcon name={'time-outline'} />
            <Text.Body secondary style={{ paddingLeft: 4 }}>
              {t('jh.deadline')}: {moment(jobData.endDate).format('DD/MM/yyyy')}
            </Text.Body>
          </View.Row>
        </View.Col>
      </View.Row>
      <View.Row
        style={{
          marginTop: 4,
          paddingHorizontal: 10,
          paddingBottom: 10,
          justifyContent: 'center'
        }}
      >
        <Button.Button style={{ flex: 1 }} onPress={onPressApply}>
          <Icon.VectorIcon
            name={'paper-plane'}
            color={Theme.colors.white_color}
          />
          <Text.BodyBold style={{ paddingLeft: 5 }}>
            {t('jh.applyNow')}
          </Text.BodyBold>
        </Button.Button>
        <View.Row style={{ width: 10 }} />
        <Button.Button secondary style={{ flex: 1 }} onPress={onPressSaveJob}>
          <Icon.VectorIcon
            name={'heart-outline'}
            color={Theme.colors.primary_color}
          />
          <Text.BodyBold primary style={{ paddingLeft: 5 }}>
            {t('jh.saveJob')}
          </Text.BodyBold>
        </Button.Button>
      </View.Row>
    </View.Col>
  );
};

export default JobHeader;
