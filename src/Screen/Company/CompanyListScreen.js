import React from 'react';
import { View, Common, List } from '@Components';
import { CompanyItem } from '@Components/Company';
import { companyBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';

const SIZE = 10;
const MARGIN_ITEM = 10;

const CompanyListScreen = (props) => {
  const { t } = useTranslation();
  let isBack = props?.route?.params?.isBack ?? false;

  const getData = async (page, size) => {
    let result = await companyBusiness.getListCompany(page, size);
    if (result.data.httpCode === 200) {
      let _companyList = result.data?.objectData?.pageData ?? [];
      return _companyList;
    }
    return [];
  };

  const renderItem = ({ item, index }) => {
    return (
      <View.Col
        key={index}
        style={{
          paddingVertical: MARGIN_ITEM / 2,
          paddingHorizontal: MARGIN_ITEM
        }}
      >
        <CompanyItem companyData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <Common.Header
        iconLeft={isBack ? 'arrow-back' : 'menu'}
        title={t('jh.companyList')}
        actionLeft={isBack ? goBack : openDrawer}
      />
      <List.ItemList
        getData={getData}
        renderItem={renderItem}
        size={SIZE}
        style={{ flex: 1, paddingVertical: MARGIN_ITEM / 2 }}
      />
    </View.Col>
  );
};

export default CompanyListScreen;
