import React, { useState } from 'react';
import { View, Text, Common, Button } from '@Components';
import StarRating from 'react-native-star-rating';
import CheckBox from '@react-native-community/checkbox';
import Theme from '@Theme';
import { companyBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { goBack } from '@NavigationAction';
import Alert from '@Alert';
import Loading from '@Loading';

const CompanyWriteReviewScreen = (props) => {
  const companyId = props.route.params?.companyId;
  const { t } = useTranslation();
  const [stateData, setStateData] = useState({
    title: '',
    content: '',
    score: 5,
    recommended: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);

  const onChangeTitle = (title) => {
    stateData.title = title;
    setLastUpdate(moment().format('x'));
  };

  const onChangeContent = (content) => {
    stateData.content = content;
    setLastUpdate(moment().format('x'));
  };

  const onChangeScore = (score) => {
    if (score !== stateData.score) {
      stateData.score = score;
      setLastUpdate(moment().format('x'));
    }
  };

  const onChangeRecommened = (recommended) => {
    stateData.recommended = recommended;
    setLastUpdate(moment().format('x'));
  };

  const onPressCancel = () => {
    Alert.show({
      title: t('jh.discard') + ' ' + t('jh.writeReview'),
      body: t('jh.wantToDiscard') + ' ' + t('jh.writeReview') + '?',
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

  const onPressWriteReview = async () => {
    if (stateData.title.trim().length < 6) {
      Alert.show({
        title: t('jh.writeReview'),
        body: t('jh.titleMustBeAtLeast6'),
        type: Alert.AlertType.DANGER
      });
    } else if (stateData.content.trim().length < 10) {
      Alert.show({
        title: t('jh.writeReview'),
        body: t('jh.contentMustBeAtLeast8'),
        type: Alert.AlertType.DANGER
      });
    } else {
      Loading.show();
      const { title, content, score, recommended } = stateData;
      let res = await companyBusiness.addComment({
        companyId,
        title,
        content,
        rateScore: score,
        recommended
      });
      if (res.data.httpCode === 200) {
        goBack();
      } else {
        Alert.show({
          title: t('jh.writeReview'),
          body: t('jh.writeReview') + ' ' + t('jh.failed')
        });
      }
      Loading.hide();
    }
  };

  return (
    <View.Col style={{ backgroundColor: Theme.colors.white_color, flex: 1 }}>
      <Common.Header title={t('jh.companyWriteReview')} actionLeft={goBack} />
      <View.Col style={{ padding: 12 }}>
        <Text.H4_Bold secondary>{t('jh.title')}</Text.H4_Bold>
        <Text.TextInput
          value={stateData.title}
          onChangeText={onChangeTitle}
          placeholder={t('jh.titlePlaceholder')}
          placeholderTextColor={Theme.colors.dark_gray_color}
          style={{
            height: 40,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Theme.border_colors.secondary_border_color,
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: Theme.colors.white_color
          }}
        />
        <Text.H4_Bold secondary>{t('jh.content')}</Text.H4_Bold>
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
            value={stateData.content}
            onChangeText={onChangeContent}
            placeholder={t('jh.contentPlaceholder')}
            placeholderTextColor={Theme.colors.dark_gray_color}
            multiline
            style={{
              maxHeight: 180,
              fontSize: 16
            }}
          />
        </View.Col>
        <Text.H4_Bold secondary>{t('jh.scoreRating')}</Text.H4_Bold>
        <View.Row style={{ marginLeft: 10 }}>
          <StarRating
            maxStars={5}
            rating={stateData.score}
            fullStarColor={Theme.colors.primary_color}
            emptyStarColor={Theme.colors.primary_color}
            starStyle={{ marginRight: 10 }}
            starSize={36}
            selectedStar={onChangeScore}
          />
        </View.Row>
        <View.Row style={{ marginTop: 5, alignItems: 'center' }}>
          <CheckBox
            fontSize={14}
            value={stateData.recommended}
            onValueChange={onChangeRecommened}
            tintColors={{
              true: Theme.colors.primary_color,
              false: Theme.colors.primary_color
            }}
          />
          <Text.Body fontSize={16} secondary style={{ paddingBottom: 3 }}>
            {t('jh.recommendThisCompany')}
          </Text.Body>
        </View.Row>
        <View.Row
          style={{
            justifyContent: 'flex-end',
            borderTopWidth: 1,
            borderColor: Theme.border_colors.secondary_border_color,
            marginTop: 10,
            paddingTop: 10
          }}
        >
          <Button.Button secondary borderWidth={1} onPress={onPressCancel}>
            <Text.BodyBold primary>{t('jh.cancel')}</Text.BodyBold>
          </Button.Button>
          <View.Col style={{ width: 10 }} />
          <Button.Button onPress={onPressWriteReview}>
            <Text.BodyBold>{t('jh.writeReview')}</Text.BodyBold>
          </Button.Button>
        </View.Row>
      </View.Col>
    </View.Col>
  );
};

export default CompanyWriteReviewScreen;
