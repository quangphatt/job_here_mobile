import React, { useState, useEffect, useRef } from 'react';
import { FlatList, LayoutAnimation, ActivityIndicator } from 'react-native';
import { View, Text, Icon, Common, Button, Loading } from '@Components';
import StarRating from 'react-native-star-rating';
import CheckBox from '@react-native-community/checkbox';
import Theme from '@Theme';
import { companyBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { goBack, navigate } from '@NavigationAction';
import { useSelector } from 'react-redux';

const PAGE_SIZE = 6;

const CompanyReviewScreen = (props) => {
  const companyId = props.route.params?.companyId;
  const { t } = useTranslation();
  const [stateData, setStateData] = useState({
    listReview: [],
    totalReview: 0,
    shouldLoadMore: true,
    loading: true,
    title: '',
    content: '',
    score: 5,
    recommended: true,
    writeReview: {
      title: '',
      content: '',
      score: 5,
      recommended: true
    }
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const sessionInfo = useSelector((state) => state.Authentication.sessionInfo);
  const listRef = useRef();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await getListComment(0);
    });
    return unsubscribe;
  }, []);

  const getListComment = async (page) => {
    let getCompanyReview = await companyBusiness.getListComment(
      companyId,
      page,
      PAGE_SIZE
    );
    if (getCompanyReview.data.httpCode === 200) {
      let _listReview = getCompanyReview.data?.objectData?.pageData ?? [];
      stateData.listReview =
        page === 0 ? _listReview : [...stateData.listReview, ..._listReview];
      let _totalRecord = getCompanyReview.data.objectData.totalRecord;
      if (stateData.totalReview !== _totalRecord) {
        stateData.totalReview = _totalRecord;
      }
      if (_listReview.length < PAGE_SIZE) stateData.shouldLoadMore = false;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const convertTimeToString = (time) => {
    let today = moment();
    let dateReceived = moment(time);
    let timeString = dateReceived.format('HH:mm DD/MM');

    if (today.isSame(dateReceived, 'day') && today.isSame(dateReceived, 'year'))
      timeString = dateReceived.format('HH:mm');
    else if (!today.isSame(dateReceived, 'year'))
      timeString = dateReceived.format('HH:mm DD/MM/YYYY');
    return timeString;
  };

  const onEndReached = async () => {
    if (stateData.shouldLoadMore && !stateData.loading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      stateData.loading = true;
      setLastUpdate(moment().format('x'));
      let currentPage = parseInt(stateData.listReview.length / PAGE_SIZE);
      await getListComment(currentPage);
    }
  };

  const onScrollToTop = () => {
    listRef?.current?.scrollToOffset?.({ animated: true, offset: 0 });
  };

  const onChangeTitle = (title) => {
    stateData.title = title;
    setLastUpdate(moment().format('x'));
  };

  const onChangeContent = (content) => {
    stateData.content = content;
    setLastUpdate(moment().format('x'));
  };

  const onChangeScore = (score) => {
    stateData.score = score;
    setLastUpdate(moment().format('x'));
  };

  const onChangeRecommened = (recommended) => {
    stateData.recommended = recommended;
    setLastUpdate(moment().format('x'));
  };

  const onPressWriteReview = () => {
    if (sessionInfo) {
      navigate('CompanyWriteReviewScreen', { companyId });
    } else {
      navigate('SignInScreen');
    }
  };

  const renderReviewItem = ({ item, index }) => {
    return (
      <View.Col
        key={index}
        style={{
          marginTop: 10,
          padding: 10,
          borderWidth: 0.5,
          borderColor: Theme.border_colors.secondary_border_color,
          borderRadius: 10
        }}
      >
        <Text.H4_Bold secondary>{item.title}</Text.H4_Bold>
        <Text.SubBodyBold style={{ color: Theme.colors.dark_gray_color }}>
          {convertTimeToString(item.createdDate)}
        </Text.SubBodyBold>
        <View.Row style={{ alignItems: 'center' }}>
          <StarRating
            maxStars={5}
            rating={item.rateScore}
            fullStarColor={Theme.colors.primary_color}
            emptyStarColor={Theme.colors.primary_color}
            disabled
            starStyle={{ marginRight: 8 }}
            starSize={24}
          />
          <Icon.VectorIcon
            name={item.isRecommended ? 'thumbs-up-sharp' : 'thumbs-down-sharp'}
            color={
              item.isRecommended ? Theme.colors.success : Theme.colors.danger
            }
            size={20}
            style={{ marginLeft: 10, marginRight: 4 }}
          />
          <Text.H4_Bold
            secondary
            style={{ paddingBottom: 4, fontStyle: 'italic' }}
          >
            {item.isRecommended ? t('jh.recommended') : t('jh.notRecommended')}
          </Text.H4_Bold>
        </View.Row>
        <Text.Body secondary>{item.content}</Text.Body>
      </View.Col>
    );
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <Common.Header title={t('jh.companyReview')} actionLeft={goBack} />
      {stateData.loading && stateData.listReview.length === 0 ? (
        <Loading placeholder />
      ) : (
        <View.Col
          style={{
            backgroundColor: Theme.colors.white_color,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            marginHorizontal: 10,
            flex: 1
          }}
        >
          <View.Col
            style={{
              borderLeftWidth: 5,
              borderColor: Theme.colors.primary_color,
              paddingLeft: 10,
              marginBottom: 5
            }}
          >
            <Text.BodyBold secondary fontSize={17}>
              {stateData.totalReview} {t('jh.peopleHaveReviewed')}
            </Text.BodyBold>
          </View.Col>
          <FlatList
            ref={listRef}
            data={stateData.listReview}
            renderItem={renderReviewItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
          />
        </View.Col>
      )}
      {stateData.loading && stateData.listReview.length > 0 && (
        <View.Col
          style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}
        >
          <ActivityIndicator
            color={Theme.colors.dark_gray_color}
            size="large"
          />
        </View.Col>
      )}
      <View.Col
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          right: 16,
          bottom: 16,
          zIndex: 1
        }}
      >
        <View.Col
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: Theme.colors.primary_color,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
          }}
        >
          <Button.ButtonPreventDouble onPress={onPressWriteReview}>
            <Icon.VectorIcon
              name={'add'}
              size={24}
              color={Theme.colors.white_color}
            />
          </Button.ButtonPreventDouble>
        </View.Col>
        <View.Col
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: Theme.colors.primary_color,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Button.ButtonPreventDouble onPress={onScrollToTop}>
            <Icon.VectorIcon
              name={'arrow-up'}
              size={24}
              color={Theme.colors.white_color}
            />
          </Button.ButtonPreventDouble>
        </View.Col>
      </View.Col>
    </View.Col>
  );
};

export default CompanyReviewScreen;
