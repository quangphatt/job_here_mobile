import React from 'react';
import { View, Text, Image, Icon, Button } from '@Components';
import { TagList } from '@Components/Tag';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { navigatePush } from '@NavigationAction';
import company_default_img from '@Assets/Images/company_default_img.jpg';

const JobItem = ({ jobData }) => {
  const { t } = useTranslation();

  let tagData = [
    {
      label: `${
        jobData.salaryMin === jobData.salaryMax
          ? jobData.salaryMin
          : `${jobData.salaryMin} - ${jobData.salaryMax}`
      } ${jobData?.unitName ?? ''}`
    },
    {
      label: jobData?.city?.cityName ?? ''
    },
    {
      label: jobData?.endDate
        ? `${t('jh.dayApplyRemain1')}${parseInt(
            (new Date(jobData.endDate) - new Date()) / 86400000
          )} ${t('jh.dayApplyRemain2')}`
        : `${t('jh.update')} ${parseInt(
            (new Date() - new Date(jobData?.createdDate ?? null)) / 86400000
          )} ${t('jh.dayAgo')}`
    }
  ];

  let avatar =
    jobData.avatar || jobData.avatarUrl
      ? { uri: jobData.avatar || jobData.avatarUrl }
      : company_default_img;

  const onPressJobName = () => {
    navigatePush('JobInfoScreen', { jobId: jobData.jobId });
  };

  const onPressCompanyName = () => {
    navigatePush('CompanyInfoScreen', { companyId: jobData.companyId });
  };

  const onPressSaveJob = () => {};

  return (
    <View.Row
      style={{
        backgroundColor: Theme.colors.white_color,
        marginTop: 5,
        marginBottom: 5,
        borderColor: Theme.border_colors.secondary_border_color,
        borderWidth: 1,
        borderRadius: 6
      }}
    >
      <View.Col style={{ padding: 10 }}>
        <Image.ImageSquare
          source={avatar}
          size={56}
          style={{ backgroundColor: Theme.colors.white_color }}
        />
      </View.Col>
      <View.Col style={{ flex: 1, paddingRight: 10, paddingBottom: 10 }}>
        <View.Row
          style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <Button.ButtonPreventDouble onPress={onPressJobName}>
            <Text.BodyBold secondary fontSize={20}>
              {jobData?.jobName ?? ''}
            </Text.BodyBold>
          </Button.ButtonPreventDouble>
          {jobData?.viewed && (
            <Icon.VectorIcon
              name={'ios-checkmark-circle'}
              color={Theme.colors.primary_color}
              style={{ marginTop: 2 }}
              size={20}
            />
          )}
        </View.Row>
        <Button.ButtonPreventDouble onPress={onPressCompanyName}>
          <Text.Body secondary fontSize={16}>
            {jobData?.companyName ?? ''}
          </Text.Body>
        </Button.ButtonPreventDouble>
        <View.Row
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <View.Row style={{ flex: 1, flexWrap: 'wrap' }}>
            <TagList tagData={tagData} />
          </View.Row>
          <Button.ButtonPreventDouble
            onPress={onPressSaveJob}
            style={{
              backgroundColor: Theme.colors.white_color,
              borderColor: Theme.border_colors.secondary_border_color,
              borderWidth: 1,
              borderRadius: 5,
              padding: 2,
              marginTop: 4
            }}
          >
            <Icon.VectorIcon
              name={'heart-outline'}
              color={Theme.colors.primary_color}
            />
          </Button.ButtonPreventDouble>
        </View.Row>
      </View.Col>
    </View.Row>
  );
};

export default JobItem;
