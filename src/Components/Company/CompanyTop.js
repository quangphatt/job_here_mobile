import React, { useState, useEffect } from 'react';
import { View, Text, Image, Icon, Button } from '@Components';
import { useTranslation } from 'react-i18next';
import { companyBusiness } from '@Business';
import { navigate, navigatePush } from '@NavigationAction';
import Theme from '@Theme';
import Slick from 'react-native-slick';
import _ from 'underscore';
import company_default_img from '@Assets/Images/company_default_img.jpg';

const CompanyTop = () => {
  const { t } = useTranslation();
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [stateData, setStateData] = useState({
    companyData: []
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await companyBusiness.getListTopCompany();
    if (result.data.httpCode === 200) {
      let _companyList = result?.data?.objectData ?? [];
      stateData.companyData = _companyList;
      setLastUpdate(moment().format('x'));
    }
  };

  const onPressSeeAllCompany = () => {
    navigate('CompanyListScreen', { isBack: true });
  };

  const onPressCompanyItem = (companyId) => () => {
    navigatePush('CompanyInfoScreen', { companyId });
  };

  if (!stateData.companyData.length) return null;

  return (
    <View.Col style={{ paddingVertical: 10 }}>
      <View.Row
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10
        }}
      >
        <Text.H3_Bold secondary>{t('jh.topCompany')}</Text.H3_Bold>
        <Button.ButtonPreventDouble
          onPress={onPressSeeAllCompany}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text.Body primary>{t('jh.seeAllCompany')}</Text.Body>
          <Icon.VectorIcon
            name={'ios-arrow-forward'}
            size={18}
            style={{ marginLeft: 5, marginTop: 3 }}
            primary
          />
        </Button.ButtonPreventDouble>
      </View.Row>
      <Slick autoplay autoplayTimeout={8} showsPagination={false} height={180}>
        {_.map(stateData.companyData, (company) => (
          <View.Col
            key={company.companyId}
            style={{
              margin: 10,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Theme.border_colors.secondary_border_color,
              borderRadius: 10,
              backgroundColor: Theme.colors.white_color
            }}
          >
            <Button.ButtonPreventDouble
              onPress={onPressCompanyItem(company.companyId)}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Image.ImageSquare
                source={
                  company?.avatarUrl
                    ? { uri: company.avatarUrl }
                    : company_default_img
                }
                size={72}
                style={{
                  borderWidth: 0,
                  backgroundColor: Theme.colors.white_color
                }}
              />
              <Text.Body secondary>{company.companyName}</Text.Body>
            </Button.ButtonPreventDouble>
          </View.Col>
        ))}
      </Slick>
    </View.Col>
  );
};

export default CompanyTop;
