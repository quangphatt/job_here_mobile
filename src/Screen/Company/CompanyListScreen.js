import React, { useEffect, useState, useRef } from 'react';
import { FlatList, LayoutAnimation, ActivityIndicator } from 'react-native';
import { View, Text, Common, Button, Loading, List } from '@Components';
import { CompanyItem } from '@Components/Company';
import { companyBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';

const SIZE = 10;
const MARGIN_ITEM = 10;

const CompanyListScreen = (props) => {
  const { t } = useTranslation();
  const [stateData, setStateData] = useState({
    listData: [],
    shouldLoadMore: true,
    loading: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const listRef = useRef(null);
  let isBack = props?.route?.params?.isBack ?? false;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let currentPage = parseInt(stateData.listData.length / SIZE);
    let result = await companyBusiness.getListCompany(currentPage, SIZE);
    if (result.data.httpCode === 200) {
      let _companyList = result.data?.objectData?.pageData ?? [];
      stateData.listData = [...stateData.listData, ..._companyList];
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
      {stateData.loading && stateData.listData.length === 0 ? (
        <Loading placeholder />
      ) : stateData.listData.length === 0 ? (
        <List.ListEmpty />
      ) : (
        <FlatList
          ref={listRef}
          data={stateData.listData}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
      {stateData.loading && stateData.listData.length > 0 && (
        <View.Col
          style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}
        >
          <ActivityIndicator
            color={Theme.colors.dark_gray_color}
            size="large"
          />
        </View.Col>
      )}
      {stateData.listData.length > 0 && (
        <Button.ButtonScrollToTop listRef={listRef} isFlatList />
      )}
    </View.Col>
  );
};

export default CompanyListScreen;
