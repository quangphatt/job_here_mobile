import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, Icon, Pagination, Button } from '@Components';
import { useTranslation } from 'react-i18next';
import { companyBusiness } from '@Business';
import { navigate } from '@NavigationAction';
import Theme from '@Theme';
import company_default_img from '@Assets/Images/company_default_img.jpg';

const { width } = Dimensions.get('window');

const CompanyTop = () => {
  const { t } = useTranslation();
  const [__lastUpdate, setLastUpdate] = useState(null);
  const [stateData, setStateData] = useState({
    companyData: []
  });
  const limit = 8;

  const getData = async () => {
    let result = await companyBusiness.getListTopCompany();
    if (result.data.httpCode === 200) {
      let _companyList = result?.data?.objectData ?? [];
      if (_companyList.length > limit)
        _companyList = _companyList.slice(-limit);
      stateData.companyData = _companyList;
      setLastUpdate(moment().format('x'));
    }
  };

  const onPressSeeAllCompany = () => {
    navigate('CompanyListScreen');
  };

  const renderItem = ({ item, index }) => {
    return (
      <Button.ButtonPreventDouble
        key={index}
        style={{
          width: width - 20,
          margin: 10,
          paddingVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: Theme.border_colors.secondary_border_color,
          borderRadius: 10
        }}
      >
        <Image.ImageSquare
          source={
            item?.avatarUrl ? { uri: item.avatarUrl } : company_default_img
          }
          size={72}
          style={{ borderWidth: 0 }}
        />
        <Text.Body secondary>{item.companyName}</Text.Body>
      </Button.ButtonPreventDouble>
    );
  };

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
      <Pagination
        listData={stateData.companyData}
        renderItem={renderItem}
        getData={getData}
        dataLength={stateData.companyData.length}
      />
    </View.Col>
  );
};

export default CompanyTop;
