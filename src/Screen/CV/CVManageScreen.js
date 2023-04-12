import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  useWindowDimensions,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { View, Text, Icon, Common, Button, Loading } from '@Components';
import PdfView from 'react-native-pdf';
import DocumentPicker from 'react-native-document-picker';
import { NativeModules } from 'react-native';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';
import { uploadBusiness, userBusiness } from '@Business';
import { getCVList, setCVLoading } from '@ReduxSlice/CVSlice';
import { useDispatch, useSelector } from 'react-redux';
import Global from '@Global';
import Alert from '@Alert';

const RNFetchBlob = NativeModules.RNFetchBlob;

const CVManageScreen = (props) => {
  const { width, height } = useWindowDimensions();
  const [stateData, setStateData] = useState({
    currentCV: {
      cvName: '',
      cvUrl: '',
      cvFilename: ''
    },
    uploadPending: false
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  let listCV = useSelector((state) => state.CV.cvList) || [];
  const loading = useSelector((state) => state.CV.loading);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listRef = useRef(null);
  let isBack = props?.route?.params?.isBack ?? false;

  useEffect(() => {
    getCVData();
  }, []);

  const getCVData = async () => {
    if (!loading) dispatch(setCVLoading(true));
    await dispatch(getCVList());
    dispatch(setCVLoading(false));
  };

  const onChangeCVName = (cvName) => {
    stateData.currentCV = { ...stateData.currentCV, cvName };
    setLastUpdate(moment().format('x'));
  };

  const onPickCV = async () => {
    try {
      let result = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.pdf
      });
      if (!!result) {
        let _uploadCV = await uploadBusiness.uploadCV(result);
        if (_uploadCV.data.httpCode === 200) {
          let _cv = _uploadCV.data?.objectData ?? {};
          stateData.currentCV = {
            cvName: _cv?.fileName ?? '',
            cvUrl: _cv?.url ?? '',
            cvFilename: result?.name ?? ''
          };
          setLastUpdate(moment().format('x'));
        }
      }
    } catch (error) {
      console.log('Error while Pick CV:', error);
    }
  };

  const onUploadCV = async () => {
    let { cvName, cvUrl } = stateData.currentCV;
    if (!cvName) {
      Alert.show({
        body: t('jh.noCVName'),
        type: Alert.AlertType.WARNING
      });
    }
    if (cvName && cvUrl) {
      stateData.uploadPending = true;
      setLastUpdate(moment().format('x'));
      let result = await userBusiness.saveCV(cvUrl, cvName);
      if (result.data.httpCode === 200) {
        Alert.show({
          body: t('jh.uploadCVSuccessfully'),
          type: Alert.AlertType.SUCCESS
        });
        stateData.uploadPending = false;
        stateData.currentCV = {
          cvName: '',
          cvUrl: '',
          cvFilename: ''
        };
        await getCVData();
      } else {
        Alert.show({
          body: t('jh.uploadCVFailed'),
          type: Alert.AlertType.DANGER
        });
        stateData.uploadPending = false;
        setLastUpdate(moment().format('x'));
      }
    }
  };

  const onPressCV = (cv) => () => {
    Global._showModal({
      label: t('jh.viewCV'),
      closeOnOverlayTap: true,
      component: (
        <View.Col style={{ height: height * 0.8 }}>
          <PdfView
            source={{ uri: cv.cvUrl }}
            style={{ flex: 1 }}
            trustAllCerts={false}
          />
        </View.Col>
      )
    });
  };

  const onDeleteCV = (cvId) => () => {
    Alert.show({
      title: t('jh.deleteCV'),
      body: t('jh.wantToDeleteCV'),
      button_primary: t('jh.delete'),
      button_secondary: t('jh.cancel'),
      type: Alert.AlertType.DANGER,
      action: async (type) => {
        if (type === Alert.ActionType.PRIMARY) {
          Alert.hide();
          let result = await userBusiness.deleteCV(cvId);
          if (result.data.httpCode === 200) {
            Alert.show({
              body: t('jh.deleteCVSuccessfully'),
              type: Alert.AlertType.SUCCESS
            });
            await getCVData();
          } else {
            Alert.show({
              body: t('jh.deleteCVFailed'),
              type: Alert.AlertType.DANGER
            });
          }
        } else Alert.hide();
      }
    });
  };

  const onPressDownloadCV = (cv) => async () => {
    if (Platform.OS === 'ios') {
      await onDownloadCV(cv);
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ).then(async (granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await onDownloadCV(cv);
          } else {
            Alert.show({
              title: t('jh.noAccessPermission'),
              body: t('jh.youMustGrantPermission'),
              type: Alert.AlertType.WARNING
            });
          }
        });
      } catch (err) {
        console.log('Error while downloading CV:', err);
      }
    }
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const onDownloadCV = async (cv) => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = cv.cvUrl;
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
          body: t('jh.downloadSuccessfully'),
          type: Alert.AlertType.SUCCESS
        });
      });
  };

  const renderItem = (item, index) => {
    return (
      <Button.ButtonPreventDouble
        key={index}
        onPress={onPressCV(item)}
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
            onPress={onDeleteCV(item.cvId)}
          >
            <Icon.VectorIcon name={'close'} size={36} />
          </Button.ButtonPreventDouble>
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
            onPress={onPressDownloadCV(item)}
          >
            <Icon.VectorIcon name={'ios-cloud-download-outline'} size={32} />
          </Button.ButtonPreventDouble>
        </View.Col>

        <View.Col style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
          <PdfView
            source={{ uri: item.cvUrl }}
            style={{ flex: 1 }}
            singlePage
            trustAllCerts={false}
          />
        </View.Col>
        <Text.BodyBold fontSize={18} secondary>
          {item.cvName}
        </Text.BodyBold>
        <Text.Body fontSize={15} secondary>
          {t('jh.createDate')}: {moment(item.createDate).format('DD/MM/YYYY')}
        </Text.Body>
        <Text.Body fontSize={15} style={{ color: Theme.colors.success }}>
          {item.cvType}
        </Text.Body>
      </Button.ButtonPreventDouble>
    );
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} ref={listRef}>
        <Common.Header
          title={t('jh.cvManage')}
          iconLeft={isBack ? 'arrow-back' : 'menu'}
          actionLeft={isBack ? goBack : openDrawer}
        />
        <View.Col>
          <View.Col
            style={{
              borderBottomWidth: 1,
              borderColor: Theme.border_colors.secondary_border_color,
              margin: 10,
              paddingBottom: 5
            }}
          >
            <Text.H4_Bold secondary>{t('jh.cvName')}</Text.H4_Bold>
            <Text.TextInput
              value={stateData.currentCV.cvName}
              onChangeText={onChangeCVName}
              placeholder={t('jh.cvNamePlaceholder')}
              placeholderTextColor={Theme.colors.dark_gray_color}
              style={{
                height: 40,
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: Theme.colors.dark_gray_color,
                borderRadius: 8,
                marginTop: 5,
                marginBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: Theme.colors.white_color
              }}
            />
            <Text.H4_Bold secondary>{t('jh.chooseCVFile')}</Text.H4_Bold>
            <Button.Button
              onPress={onPickCV}
              secondary
              style={{ width: 160, marginVertical: 5 }}
            >
              <Text.Body secondary>{t('jh.chooseFile')}</Text.Body>
            </Button.Button>
            <Text.Body secondary>
              {stateData.currentCV.cvFilename || t('jh.noCurrentCV')}
            </Text.Body>
            <View.Row style={{ alignItems: 'center' }}>
              <Button.Button
                onPress={onUploadCV}
                style={{ width: 160, marginVertical: 5, marginRight: 5 }}
              >
                <Text.Body>{t('jh.uploadCV')}</Text.Body>
              </Button.Button>
              {stateData.uploadPending && (
                <Text.Body secondary>{t('jh.uploading')}...</Text.Body>
              )}
            </View.Row>
          </View.Col>
          <View.Col style={{ marginHorizontal: 5, marginBottom: 5 }}>
            {loading ? (
              <Loading placeholder />
            ) : (
              _.map(listCV, (item, index) => {
                return renderItem(item, index);
              })
            )}
          </View.Col>
        </View.Col>
      </ScrollView>
      {listCV.length > 1 && <Button.ButtonScrollToTop listRef={listRef} />}
    </View.Col>
  );
};

export default CVManageScreen;
