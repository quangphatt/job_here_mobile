import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  useWindowDimensions,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { View, Text, Icon, Common, Button, Loading } from '@Components';
import { CVItem } from '@Components/CV';
import DocumentPicker from 'react-native-document-picker';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';
import { uploadBusiness, userBusiness } from '@Business';
import { getCVList, setCVLoading } from '@ReduxSlice/CVSlice';
import { useDispatch, useSelector } from 'react-redux';
import Global from '@Global';
import Alert from '@Alert';

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
          body: t('jh.uploadCV') + ' ' + t('jh.successfully'),
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
          body: t('jh.uploadCV') + ' ' + t('jh.failed'),
          type: Alert.AlertType.DANGER
        });
        stateData.uploadPending = false;
        setLastUpdate(moment().format('x'));
      }
    }
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
              _.map(listCV, (cv, index) => {
                return <CVItem key={cv.cvId} cvData={cv} />;
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
