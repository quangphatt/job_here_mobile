import React from 'react';
import {
  ScrollView,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
  NativeModules
} from 'react-native';
import { View, Text, Icon, Button } from '@Components';
import { CVBody } from '@Components/CV';
import PdfView from 'react-native-pdf';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { userBusiness } from '@Business';
import Global from '@Global';
import Alert from '@Alert';

const RNFetchBlob = NativeModules.RNFetchBlob;

const CVItem = ({ cvData }) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();

  const getCvDataForBody = () => {
    try {
      const cvDataForBody = JSON.parse(cvData.cvContent);
      return cvDataForBody;
    } catch (e) {
      return null;
    }
  };

  const onPressCV = async () => {
    Global._showModal({
      label: `${t('jh.viewCV')}: ${cvData.cvName}`,
      closeOnOverlayTap: true,
      component: (
        <View.Col style={{ height: height * 0.8 }}>
          {cvData.cvType === 'UPLOADED' ? (
            <PdfView
              source={{ uri: cvData.cvUrl }}
              style={{ flex: 1 }}
              trustAllCerts={false}
            />
          ) : (
            <ScrollView>
              <CVBody
                cvData={getCvDataForBody()}
                templateData={cvData.cvTemplate}
              />
            </ScrollView>
          )}
        </View.Col>
      )
    });
  };

  const onPressDownloadCV = async () => {
    // PENDING
    // if (Platform.OS === 'ios') {
    //   await onDownloadCV();
    // } else {
    //   try {
    //     PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    //     ).then(async (granted) => {
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         await onDownloadCV();
    //       } else {
    //         Alert.show({
    //           title: t('jh.noAccessPermission'),
    //           body: t('jh.youMustGrantPermission'),
    //           type: Alert.AlertType.WARNING
    //         });
    //       }
    //     });
    //   } catch (err) {
    //     console.log('Error while downloading CV:', err);
    //   }
    // }
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const onDownloadCV = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = cvData.cvUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'Download from Jobhere',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true
      }
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then((res) => {
        Alert.show({
          body: t('jh.download') + ' ' + t('jh.successfully'),
          type: Alert.AlertType.SUCCESS
        });
      });
  };

  const onDeleteCV = () => {
    Alert.show({
      title: t('jh.deleteCV'),
      body: t('jh.wantToDeleteCV'),
      button_primary: t('jh.delete'),
      button_secondary: t('jh.cancel'),
      type: Alert.AlertType.DANGER,
      action: async (type) => {
        if (type === Alert.ActionType.PRIMARY) {
          Alert.hide();
          let result = await userBusiness.deleteCV(cvData.cvId);
          if (result.data.httpCode === 200) {
            Alert.show({
              body: t('jh.deleteCV') + ' ' + t('jh.successfully'),
              type: Alert.AlertType.SUCCESS
            });
            await getCVData();
          } else {
            Alert.show({
              body: t('jh.deleteCV') + ' ' + t('jh.failed'),
              type: Alert.AlertType.DANGER
            });
          }
        } else Alert.hide();
      }
    });
  };

  return (
    <Button.ButtonPreventDouble
      onPress={onPressCV}
      style={{
        height: width * 1.2,
        margin: 5,
        padding: 8,
        backgroundColor: Theme.colors.white_color,
        borderWidth: 0.5,
        borderColor: Theme.border_colors.secondary_border_color,
        borderRadius: 10
      }}
    >
      <View.Col
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1
        }}
      >
        <Button.ButtonPreventDouble
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Theme.colors.dark_gray_color_blur
          }}
          onPress={onDeleteCV}
        >
          <Icon.VectorIcon name={'close'} size={36} />
        </Button.ButtonPreventDouble>
        {cvData.cvType === 'UPLOADED' && (
          <Button.ButtonPreventDouble
            style={{
              height: 40,
              width: 40,
              marginTop: 5,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Theme.colors.dark_gray_color_blur
            }}
            onPress={onPressDownloadCV}
          >
            <Icon.VectorIcon name={'ios-cloud-download-outline'} size={32} />
          </Button.ButtonPreventDouble>
        )}
      </View.Col>

      <View.Col style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
        {cvData.cvType === 'UPLOADED' ? (
          <PdfView
            source={{ uri: cvData.cvUrl }}
            style={{ flex: 1 }}
            singlePage
            trustAllCerts={false}
          />
        ) : (
          <CVBody
            cvData={getCvDataForBody()}
            templateData={cvData.cvTemplate}
          />
        )}
      </View.Col>
      <Text.BodyBold fontSize={18} secondary>
        {cvData.cvName}
      </Text.BodyBold>
      <Text.Body fontSize={15} secondary>
        {t('jh.createDate')}: {moment(cvData.createDate).format('DD/MM/YYYY')}
      </Text.Body>
      <Text.Body fontSize={15} style={{ color: Theme.colors.success }}>
        {cvData.cvType}
      </Text.Body>
    </Button.ButtonPreventDouble>
  );
};

export default CVItem;
