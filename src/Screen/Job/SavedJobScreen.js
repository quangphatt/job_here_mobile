import React, { useEffect, useState, useRef } from 'react';
import { FlatList, LayoutAnimation, ActivityIndicator } from 'react-native';
import { View, Text, Common, Button, Loading, List } from '@Components';
import { JobItem } from '@Components/Job';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { jobBusiness, dropdownBusiness } from '@Business';
import { useSelector } from 'react-redux';
import { openDrawer } from '@NavigationAction';

const SIZE = 10;
const MARGIN_ITEM = 10;

const SavedJobScreen = () => {
  const [stateData, setStateData] = useState({
    listData: [],
    shouldLoadMore: true,
    loading: true,
    unitDropdown: []
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const { t } = useTranslation();
  const listRef = useRef(null);
  const savedJobList =
    useSelector((state) => state.SavedJob.listSavedJob) || [];

  useEffect(() => {
    getData();
  }, [savedJobList]);

  const getData = async () => {
    let currentPage = parseInt(stateData.listData.length / SIZE);
    let result = await jobBusiness.getSavedJob(currentPage, SIZE);
    if (result.data.httpCode === 200) {
      if (stateData.unitDropdown.length === 0) {
        await getUnitDropdown();
      }
      let listJob = result?.data?.objectData?.pageData ?? [];
      for (let i = 0; i < listJob.length; i++) {
        listJob[i].unitName =
          unitDropdown.find((x) => x.unit === listJob[i].unit)?.unitName ?? '';
      }
      stateData.listData = [...stateData.listData, ...listJob];
      if (listJob.length < SIZE) stateData.shouldLoadMore = false;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const getUnitDropdown = async () => {
    let _unit = await dropdownBusiness.getUnitDropdown();
    if (_unit.data.httpCode === 200) {
      let _unitDropdown = _unit.data?.objectData ?? [];
      stateData.unitDropdown = _unitDropdown;
      setLastUpdate(moment().format('x'));
    }
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
      <View.Col key={index} style={{ paddingHorizontal: MARGIN_ITEM }}>
        <JobItem jobData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <Common.Header
        iconLeft={'menu'}
        title={t('jh.savedJob')}
        actionLeft={openDrawer}
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

export default SavedJobScreen;
