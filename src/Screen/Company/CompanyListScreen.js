import React, { useState, useEffect, useRef } from 'react';
import { FlatList, LayoutAnimation, ActivityIndicator } from 'react-native';
import { View, Common, Button } from '@Components';
import { CompanyItem } from '@Components/Company';
import Theme from '@Theme';
import { companyBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';

const SIZE = 10;
const MARGIN_ITEM = 10;

const CompanyListScreen = (props) => {
  const [stateData, setStateData] = useState({
    companyList: [],
    shouldLoadMore: true,
    loading: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const listRef = useRef(null);
  const { t } = useTranslation();
  let isBack = props?.route?.params?.isBack ?? false;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let currentPage = parseInt(stateData.companyList.length / SIZE);
    let result = await companyBusiness.getListCompany(currentPage, SIZE);
    if (result.data.httpCode === 200) {
      let _companyList = result.data?.objectData?.pageData ?? [];
      stateData.companyList = [...stateData.companyList, ..._companyList];
      if (_companyList.length < SIZE) stateData.shouldLoadMore = false;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const onEndReached = async () => {
    if (stateData.shouldLoadMore && !stateData.loading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      stateData.loading = true;
      setLastUpdate(moment().format('x'));
      await getData();
    }
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
      <FlatList
        ref={listRef}
        data={stateData.companyList}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: MARGIN_ITEM / 2 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
      />
      {stateData.loading && (
        <View.Col
          style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}
        >
          <ActivityIndicator
            color={Theme.colors.dark_gray_color}
            size="large"
          />
        </View.Col>
      )}
      {stateData.companyList.length > SIZE && (
        <Button.ButtonScrollToTop listRef={listRef} isFlatList />
      )}
    </View.Col>
  );
};

export default CompanyListScreen;
