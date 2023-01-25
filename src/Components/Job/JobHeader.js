import React from 'react';
import { View, Text, Icon, Button, Image } from '@Components';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';

const JobHeader = ({ jobData }) => {
  const { t } = useTranslation();

  const onPressApply = () => {};

  const onPressSaveJob = () => {};

  return (
    <View.Col
      style={{
        backgroundColor: Theme.colors.white_color,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.border_colors.primary_border_color
      }}
    >
      <View.Row>
        <View.Col style={{ padding: 10 }}>
          <Image.ImageCircle source={{ uri: jobData.avatar }} size={60} />
        </View.Col>
        <View.Col>
          <Button.ButtonPreventDouble onPress={onPressApply}>
            <Text.H3_Bold primary>{jobData.jobName}</Text.H3_Bold>
          </Button.ButtonPreventDouble>
          <Button.ButtonPreventDouble onPress={onPressSaveJob}>
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
          paddingHorizontal: 16,
          paddingBottom: 10,
          justifyContent: 'center'
        }}
      >
        <Button.Button style={{ flex: 1 }}>
          <Icon.VectorIcon
            name={'paper-plane'}
            color={Theme.colors.white_color}
          />
          <Text.BodyBold style={{ paddingLeft: 5 }}>
            {t('jh.applyNow')}
          </Text.BodyBold>
        </Button.Button>
        <View.Row style={{ width: 16 }} />
        <Button.Button secondary style={{ flex: 1 }}>
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
