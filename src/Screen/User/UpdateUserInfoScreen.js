import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, Icon, Common, Image, Button, List } from '@Components';
import DateTimePicker from '@react-native-community/datetimepicker';
import Theme from '@Theme';
import Global from '@Global';
import { goBack } from '@NavigationAction';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  userBusiness,
  dropdownBusiness,
  uploadBusiness,
  authBusiness
} from '@Business';
import avatar_img from '@Assets/Images/user.png';
import DocumentPicker from 'react-native-document-picker';
import Alert from '@Alert';
import Loading from '@Loading';
import {
  ValidateUTF8Name,
  ValidateDateOfBirth,
  ValidatePhone
} from '@Config/Validate';
import { changeSession } from '@ReduxSlice/AuthenticationSlice';

const UpdateUserInfoScreen = () => {
  const { t } = useTranslation();
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    displayName: sessionInfo?.fullname ?? '',
    address: sessionInfo?.address ?? '',
    dateOfBirth: sessionInfo?.dateOfBirth ?? '',
    gender: sessionInfo?.gender ?? 'OTHER',
    phone: sessionInfo?.phone ?? '',
    imageUrl: sessionInfo?.imageUrl ?? null
  });
  const [dropdown, setDropdown] = useState({ gender: [] });

  useEffect(() => {
    getGenderDropdown();
  });

  const getGenderDropdown = async () => {
    let result = await dropdownBusiness.getGenderDropdown();
    if (result.data.httpCode === 200) {
      let _listItem = _.map(result.data.objectData, (item) => ({
        id: item.gender,
        name: item.genderName
      }));
      setDropdown({ ...dropdown, gender: _listItem });
    }
  };

  const onPickAvatar = async () => {
    try {
      let result = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.images
      });
      if (result) {
        if (result.size < 1000000) {
          let _uploadImage = await uploadBusiness.uploadImage(result);
          if (_uploadImage.data.httpCode === 200) {
            let imageUrl = _uploadImage.data?.objectData.url ?? '';
            if (imageUrl) setAccount((prev) => ({ ...prev, imageUrl }));
          }
        } else {
          Alert.show({
            title: t('jh.fileTooLarge'),
            body: t('jh.uploadLessThan1MB'),
            type: Alert.AlertType.DANGER
          });
        }
      }
    } catch (error) {
      console.log('Error while Pick Image:', error);
    }
  };

  const onChangeDisplayName = (displayName) => {
    setAccount((prev) => ({ ...prev, displayName }));
  };

  const onChangeAddress = (address) => {
    setAccount((prev) => ({ ...prev, address }));
  };

  const onChangeDateOfBirth = (event, selectedDate) => {
    Global._hideModal();
    setAccount((prev) => ({
      ...prev,
      dateOfBirth: moment(selectedDate, 'MM-DD-YYYY').format('YYYY/MM/DD')
    }));
  };

  const onPressDateOfBirth = () => {
    Global._showModal({
      isShowHeader: false,
      closeOnOverlayTap: true,
      component: (
        <DateTimePicker
          value={
            account.dateOfBirth ? new Date(account.dateOfBirth) : new Date()
          }
          mode={'date'}
          onChange={onChangeDateOfBirth}
        />
      )
    });
  };

  const onChangeGender = (gender) => {
    setAccount((prev) => ({ ...prev, gender }));
  };

  const onPressGender = () => {
    if (dropdown.gender.length > 0) {
      Global._showModal({
        isScroll: true,
        label: t('jh.gender'),
        closeOnOverlayTap: true,
        component: (
          <List.SelectionList
            listItem={dropdown.gender}
            onSelectItem={onChangeGender}
            currentItem={account.gender}
          />
        )
      });
    }
  };

  const onChangePhoneNumber = (phone) => {
    setAccount((prev) => ({ ...prev, phone }));
  };

  const onPressCancel = () => {
    Alert.show({
      title: t('jh.discard') + ' ' + t('jh.edit'),
      body: t('jh.wantToDiscard') + ' ' + t('jh.edit') + '?',
      type: Alert.AlertType.WARNING,
      button_primary: t('jh.discard'),
      button_secondary: t('jh.continue'),
      action: (type) => {
        Alert.hide();
        if (type === Alert.ActionType.PRIMARY) {
          goBack();
        }
      }
    });
  };

  const onPressUpload = async () => {
    if (!ValidateUTF8Name(account.displayName)) {
      Alert.show({
        title: t('jh.updateUserInfo'),
        body: t('jh.invalidDisplayName')
      });
    } else if (!ValidateDateOfBirth(account.dateOfBirth)) {
      Alert.show({
        title: t('jh.updateUserInfo'),
        body: t('jh.invalidDateOfBirth')
      });
    } else if (!ValidatePhone(account.phone)) {
      Alert.show({
        title: t('jh.updateUserInfo'),
        body: t('jh.invalidPhoneNumber')
      });
    } else {
      let { displayName, address, dateOfBirth, phone, gender, imageUrl } =
        account;
      Loading.show();
      let _updateInfo = await userBusiness.updateUserInfo(
        displayName,
        address,
        dateOfBirth,
        phone,
        gender,
        imageUrl
      );

      if (_updateInfo.data.httpCode === 200) {
        let session = await authBusiness.getSessionInfo();
        Loading.hide();
        if (session.data.httpCode === 200) {
          dispatch(changeSession(session.data.objectData));
        }
        Alert.show({
          title: t('jh.updateUserInfo'),
          body: t('jh.updateUserInfo') + ' ' + t('jh.successfully'),
          type: Alert.AlertType.SUCCESS
        });
      } else {
        Loading.hide();
        Alert.show({
          title: t('jh.updateUserInfo'),
          body: _updateInfo?.data?.message ?? '',
          type: Alert.AlertType.DANGER
        });
      }
      setTimeout(() => {
        Alert.hide();
      }, 2000);
    }
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <Common.Header title={t('jh.updateUserInfo')} actionLeft={goBack} />
        <View.Col
          style={{
            margin: 10,
            padding: 10,
            backgroundColor: Theme.colors.white_color,
            borderRadius: 10
          }}
        >
          <View.Col
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button.ButtonPreventDouble
              onPress={onPickAvatar}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 160
              }}
            >
              <Image.ImageCircle
                source={
                  account.imageUrl ? { uri: account.imageUrl } : avatar_img
                }
                size={160}
              />
              <Icon.VectorIcon
                name={'create-outline'}
                size={40}
                style={{ position: 'absolute', bottom: 0, right: 0 }}
              />
            </Button.ButtonPreventDouble>
          </View.Col>

          <View.Col style={styles.item_group}>
            <Text.BodyBold
              fontSize={16}
              color={Theme.text_colors.gray_text_color}
            >
              {t('jh.email')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'mail'} style={{ padding: 10 }} />
              <Text.TextInput
                value={sessionInfo?.email ?? ''}
                style={styles.text_input}
                editable={false}
              />
            </View.Row>
          </View.Col>
          <View.Col style={styles.item_group}>
            <Text.BodyBold
              fontSize={16}
              color={Theme.text_colors.gray_text_color}
            >
              {t('jh.displayName')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'person'} style={{ padding: 10 }} />
              <Text.TextInput
                value={account.displayName}
                onChangeText={onChangeDisplayName}
                placeholder={t('jh.displayNamePlaceholder')}
                placeholderTextColor={Theme.colors.dark_gray_color}
                style={styles.text_input}
              />
            </View.Row>
          </View.Col>
          <View.Col style={styles.item_group}>
            <Text.BodyBold
              fontSize={16}
              color={Theme.text_colors.gray_text_color}
            >
              {t('jh.address')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'home'} style={{ padding: 10 }} />
              <Text.TextInput
                value={account.address}
                onChangeText={onChangeAddress}
                placeholder={t('jh.addressPlaceholder')}
                placeholderTextColor={Theme.colors.dark_gray_color}
                style={styles.text_input}
              />
            </View.Row>
          </View.Col>
          <View.Col style={styles.item_group}>
            <Text.BodyBold
              fontSize={16}
              color={Theme.text_colors.gray_text_color}
            >
              {t('jh.dateOfBirth')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'calendar'} style={{ padding: 10 }} />
              <Button.ButtonPreventDouble
                onPress={onPressDateOfBirth}
                style={[styles.text_input]}
              >
                <View.Col
                  style={{
                    flex: 1,
                    justifyContent: 'center'
                  }}
                >
                  <Text.Body secondary>
                    {account.dateOfBirth
                      ? moment(account.dateOfBirth).format('DD-MM-YYYY')
                      : moment().format('DD-MM-YYYY')}
                  </Text.Body>
                </View.Col>
              </Button.ButtonPreventDouble>
            </View.Row>
          </View.Col>
          <View.Col style={styles.item_group}>
            <Text.BodyBold
              fontSize={16}
              color={Theme.text_colors.gray_text_color}
            >
              {t('jh.gender')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon
                name={'ios-male-female'}
                style={{ padding: 10 }}
              />
              <Button.ButtonPreventDouble
                onPress={onPressGender}
                style={[styles.text_input]}
              >
                <View.Row
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text.Body secondary>
                    {_.find(
                      dropdown.gender,
                      (item) => item.id === account.gender
                    )?.name ?? t('jh.gender')}
                  </Text.Body>
                  <Icon.VectorIcon
                    name={'chevron-down'}
                    size={22}
                    style={{ right: 10 }}
                  />
                </View.Row>
              </Button.ButtonPreventDouble>
            </View.Row>
          </View.Col>
          <View.Col style={styles.item_group}>
            <Text.BodyBold
              fontSize={16}
              color={Theme.text_colors.gray_text_color}
            >
              {t('jh.phoneNumber')}
            </Text.BodyBold>
            <View.Row style={styles.text_input_wrapper}>
              <Icon.VectorIcon name={'call'} style={{ padding: 10 }} />
              <Text.TextInput
                value={account.phone}
                onChangeText={onChangePhoneNumber}
                placeholder={t('jh.phoneNumberPlaceholder')}
                placeholderTextColor={Theme.colors.dark_gray_color}
                style={styles.text_input}
                keyboardType={'number-pad'}
              />
            </View.Row>
          </View.Col>
          <View.Row style={{ justifyContent: 'flex-end', marginTop: 10 }}>
            <Button.Button secondary onPress={onPressCancel}>
              <Text.BodyBold primary>{t('jh.discard')}</Text.BodyBold>
            </Button.Button>
            <View.Col style={{ width: 10 }} />
            <Button.Button onPress={onPressUpload}>
              <Text.BodyBold>{t('jh.update')}</Text.BodyBold>
            </Button.Button>
          </View.Row>
        </View.Col>
      </ScrollView>
    </View.Col>
  );
};

export default UpdateUserInfoScreen;

const styles = StyleSheet.create({
  item_group: { marginTop: 5 },
  text_input_wrapper: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Theme.colors.dark_gray_color,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: Theme.background_colors.box_background_color
  },
  text_input: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 0.5,
    borderColor: Theme.colors.dark_gray_color,
    paddingLeft: 10
  }
});
