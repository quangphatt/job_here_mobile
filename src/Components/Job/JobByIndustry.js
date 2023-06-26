import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text, Button, Image } from '@Components';
import Theme from '@Theme';
import { reportBusiness } from 'Business';
import _ from 'underscore';
import { useTranslation } from 'react-i18next';
import Slick from 'react-native-slick';
import { navigate } from '@NavigationAction';

const JobByIndustry = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res = await reportBusiness.getTotalJobByIndustry(4);
      if (res.data.httpCode === 200) {
        setData(res.data?.objectData ?? []);
      }
    };
    getData();
  }, []);

  const onPressIndustry = (industryId) => () => {
    // Navigate to SearchJobScreen
    navigate('SearchJobScreen', { industryId });
  };

  if (!data.length) return null;

  return (
    <View.Col style={{ paddingVertical: 10 }}>
      <Text.H3_Bold secondary style={{ paddingLeft: 10 }}>
        {t('jh.topIndustry')}
      </Text.H3_Bold>
      <Slick autoplay autoplayTimeout={8} showsPagination={false}>
        {_.map(data, (industry) => (
          <View.Col
            key={industry.industryId}
            style={{
              backgroundColor: Theme.colors.white_color,
              margin: 10,
              paddingVertical: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Theme.border_colors.secondary_border_color,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button.ButtonPreventDouble
              onPress={onPressIndustry(industry.industryId)}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Image.ImageSquare
                source={{ uri: industry.imageUrl }}
                size={80}
                style={{
                  borderColor: Theme.border_colors.primary_border_color,
                  borderWidth: 1,
                  backgroundColor: Theme.colors.white_color,
                  marginTop: 3
                }}
              />
              <Text.BodyBold secondary fontSize={17}>
                {industry.industryName}
              </Text.BodyBold>
            </Button.ButtonPreventDouble>
            <Text.Body primary>
              {industry.totalJob} {t('jh.job')}
            </Text.Body>
          </View.Col>
        ))}
      </Slick>
    </View.Col>
  );
};

export default JobByIndustry;
