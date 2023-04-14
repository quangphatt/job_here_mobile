import React, { useState } from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { View, Text, Icon, Button, List } from '@Components';
import PdfView from 'react-native-pdf';
import Theme from '@Theme';
import { useSelector } from 'react-redux';
import { userBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { navigate } from '@NavigationAction';
import Global from '@Global';
import Alert from '@Alert';

const JobApply = ({ jobData }) => {
  const { height } = useWindowDimensions();
  const { t } = useTranslation();
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);
  const listCV = useSelector((state) => state.CV.cvList) || [];
  const [stateData, setStateData] = useState({
    cv: listCV[0],
    summary: ''
  });
  const [__lastUpdate, setLastUpdate] = useState(null);

  const onChangeSummary = (summary) => {
    stateData.summary = summary;
    setLastUpdate(moment().format('x'));
  };

  const onPressUpdateInfo = () => {
    Global._hideModal();
    navigate('UpdateUserInfoScreen');
  };

  const onSelectCV = (cvId) => {
    let _cv = _.find(listCV, (cv) => cv.cvId === cvId);
    stateData.cv = _cv;
    setLastUpdate(moment().format('x'));
  };

  const onViewCV = () => {
    Global._showModal({
      label: `${t('jh.viewCV')}: ${stateData.cv.cvName}`,
      closeOnOverlayTap: true,
      component: (
        <View.Col style={{ height: height * 0.8 }}>
          <PdfView
            source={{ uri: stateData.cv.cvUrl }}
            style={{ flex: 1 }}
            trustAllCerts={false}
          />
        </View.Col>
      )
    });
  };

  const onManageCV = () => {
    Global._hideModal();
    navigate('CVManageScreen', { isBack: true });
  };

  const onPressCancel = () => {
    Global._hideModal();
  };

  const onPressApply = () => {
    if (stateData.summary) {
      Alert.show({
        title: t('jh.applyJob'),
        body: t('jh.wantToApplyJob'),
        button_primary: t('jh.apply'),
        button_secondary: t('jh.cancel'),
        action: async (type) => {
          Alert.hide();
          if (type === Alert.ActionType.PRIMARY) {
            let result = await userBusiness.applyJob(
              jobData.jobId,
              stateData.cv.cvId,
              stateData.summary
            );
            if (result.data.httpCode === 200) {
              Alert.show({
                body: t('jh.applyJob') + ' ' + t('jh.successfully'),
                type: Alert.AlertType.SUCCESS
              });
              await getCVData();
            } else {
              Alert.show({
                body: t('jh.applyJob') + ' ' + t('jh.failed'),
                type: Alert.AlertType.DANGER
              });
            }
          }
        }
      });
    } else {
      Alert.show({
        title: t('jh.missingSummary'),
        body: t('jh.missingSummaryBody'),
        type: Alert.AlertType.WARNING
      });
    }
  };

  return (
    <View.Col style={{ padding: 10 }}>
      <View.Row style={styles.info_wrapper}>
        <Text.Body fontSize={18} secondary>
          {t('jh.displayName')}:{' '}
        </Text.Body>
        <Text.BodyBold fontSize={18} secondary style={{ flex: 1 }}>
          {sessionInfo?.fullname ?? ''}
        </Text.BodyBold>
      </View.Row>
      <View.Row style={styles.info_wrapper}>
        <Text.Body fontSize={18} secondary>
          {t('jh.email')}:{' '}
        </Text.Body>
        <Text.BodyBold fontSize={18} secondary style={{ flex: 1 }}>
          {sessionInfo?.email ?? ''}
        </Text.BodyBold>
      </View.Row>
      <View.Row style={styles.info_wrapper}>
        <Text.Body fontSize={18} secondary>
          {t('jh.phoneNumber')}:{' '}
        </Text.Body>
        <Text.BodyBold fontSize={18} secondary style={{ flex: 1 }}>
          {sessionInfo?.phone ?? ''}
        </Text.BodyBold>
      </View.Row>
      <View.Row style={styles.info_wrapper}>
        <Text.Body secondary>{t('jh.ifInfoNotCorrect')} </Text.Body>
        <Button.ButtonPreventDouble onPress={onPressUpdateInfo}>
          <Text.Body primary>{t('jh.updateUserInfo')}</Text.Body>
        </Button.ButtonPreventDouble>
      </View.Row>
      <View.Col style={styles.info_wrapper}>
        <Text.Body fontSize={18} secondary>
          CV:
        </Text.Body>
        <List.DropdownButton
          label={'CV'}
          listItem={_.map(listCV, (item) => ({
            id: item.cvId,
            name: item.cvName
          }))}
          currentItem={stateData.cv.cvId}
          onSelectItem={onSelectCV}
          style={{ marginLeft: 0, marginRight: 0 }}
        />
        <View.Row>
          <Button.ButtonPreventDouble
            onPress={onViewCV}
            style={styles.option_wrapper}
          >
            <Icon.VectorIcon name={'expand'} size={24} />
            <Text.Body secondary style={styles.option_text}>
              {t('jh.viewCV')}
            </Text.Body>
          </Button.ButtonPreventDouble>
          <View.Col style={{ width: 20 }} />
          <Button.ButtonPreventDouble
            onPress={onManageCV}
            style={styles.option_wrapper}
          >
            <Icon.VectorIcon name={'create-outline'} size={24} />
            <Text.Body secondary style={styles.option_text}>
              {t('jh.cvManage')}
            </Text.Body>
          </Button.ButtonPreventDouble>
        </View.Row>
      </View.Col>
      <View.Col style={styles.info_wrapper}>
        <Text.Body fontSize={18} secondary>
          {t('jh.summary')}:
        </Text.Body>
        <View.Col
          style={{
            borderColor: Theme.border_colors.secondary_border_color,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            height: 200
          }}
        >
          <Text.TextInput
            value={stateData.summary}
            onChangeText={onChangeSummary}
            placeholder={t('jh.summaryPlaceholder')}
            placeholderTextColor={Theme.colors.dark_gray_color}
            multiline
            style={{
              maxHeight: 180,
              fontSize: 16
            }}
          />
        </View.Col>
      </View.Col>
      <View.Row
        style={{
          marginTop: 10,
          justifyContent: 'flex-end'
        }}
      >
        <Button.Button secondary onPress={onPressCancel}>
          <Text.H4 primary>{t('jh.cancel')}</Text.H4>
        </Button.Button>
        <View.Col style={{ width: 10 }} />
        <Button.Button onPress={onPressApply}>
          <Text.H4>{t('jh.applyJob')}</Text.H4>
        </Button.Button>
      </View.Row>
    </View.Col>
  );
};

export default JobApply;

const styles = StyleSheet.create({
  info_wrapper: {
    marginBottom: 10
  },
  option_wrapper: {
    flexDirection: 'row',
    borderColor: Theme.text_colors.secondary_text_color,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 5
  },
  option_text: {
    fontSize: 16,
    marginLeft: 5
  }
});
