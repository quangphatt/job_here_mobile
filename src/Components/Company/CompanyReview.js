import React, { useEffect, useState } from 'react';
import { View, Text, Button, Loading } from '@Components';
import StarRating from 'react-native-star-rating';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Theme from '@Theme';
import { companyBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { navigate } from '@NavigationAction';

const CompanyReview = ({ companyId }) => {
  const { t } = useTranslation();
  const [stateData, setStateData] = useState({
    companyScore: 0,
    companyPercent: 0,
    loading: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    stateData.loading = true;
    setLastUpdate(moment().format('x'));
    let getCompanyScore = await companyBusiness.getCompanyScore(companyId);
    if (getCompanyScore.data.httpCode === 200) {
      stateData.companyScore = getCompanyScore.data.objectData.score;
      stateData.companyPercent = getCompanyScore.data.objectData.percent;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const onPressViewReview = () => {
    navigate('CompanyReviewScreen', { companyId });
  };

  if (stateData.loading) return <Loading placeholder />;

  return (
    <View.Col style={{ paddingHorizontal: 10 }}>
      <View.Col
        style={{
          backgroundColor: Theme.colors.white_color,
          padding: 10,
          borderRadius: 10,
          marginTop: 10
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
            {t('jh.ratingOfCompany')}
          </Text.BodyBold>
        </View.Col>
        <View.Row style={{ justifyContent: 'center', alignItems: 'center' }}>
          <StarRating
            maxStars={5}
            rating={stateData.companyScore}
            fullStarColor={Theme.colors.primary_color}
            emptyStarColor={Theme.colors.primary_color}
            disabled
            starStyle={{ marginRight: 10 }}
          />
          <View.Col
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderColor: Theme.colors.primary_color,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
              marginVertical: 5
            }}
          >
            <Text.Body fontSize={26} secondary style={{ paddingBottom: 5 }}>
              {stateData.companyScore}
            </Text.Body>
          </View.Col>
        </View.Row>
        <View.Col
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderColor: Theme.border_colors.secondary_border_color,
            marginVertical: 10
          }}
        />
        <View.Row style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View.Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10
            }}
          >
            <AnimatedCircularProgress
              size={64}
              width={8}
              fill={stateData.companyPercent}
              rotation={0}
              tintColor={Theme.colors.primary_color}
              backgroundColor={Theme.border_colors.primary_border_color}
            />
            <Text.Body
              secondary
              fontSize={16}
              style={{ position: 'absolute', paddingBottom: 4 }}
            >
              {stateData.companyPercent}%
            </Text.Body>
          </View.Col>
          <Text.Body fontSize={16} secondary>
            {t('jh.recommendWorkHere')}
          </Text.Body>
        </View.Row>
        <View.Col
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderColor: Theme.border_colors.secondary_border_color,
            marginVertical: 10
          }}
        />
        <View.Row style={{ justifyContent: 'center' }}>
          <Button.Button onPress={onPressViewReview}>
            <Text.BodyBold>{t('jh.viewReview')}</Text.BodyBold>
          </Button.Button>
        </View.Row>
      </View.Col>
    </View.Col>
  );
};

export default CompanyReview;
