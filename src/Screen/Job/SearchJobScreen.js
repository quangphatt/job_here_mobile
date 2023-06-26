import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  InteractionManager,
  ActivityIndicator,
  LayoutAnimation
} from 'react-native';
import { View, Text, Icon, Common, List, Button, Loading } from '@Components';
import { JobItem } from '@Components/Job';
import Theme from '@Theme';
import { jobBusiness, dropdownBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';

const SIZE = 10;
const MARGIN_ITEM = 10;

const SearchJobScreen = (props) => {
  const { t } = useTranslation();
  const [stateData, setStateData] = useState({
    searchParams: {
      keyword: '',
      industry: props.route?.params?.industryId ?? 0,
      skill: 0,
      city: 0,
      isChanged: false
    },
    dropdown: {
      industryDropdown: [],
      skillDropdown: [],
      cityDropdown: [],
      unitDropdown: []
    },
    listData: [],
    shouldLoadMore: true,
    loading: true,
    totalResult: 0
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const listRef = useRef(null);
  let isBack = props?.route?.params?.isBack ?? false;

  useEffect(() => {
    InteractionManager.runAfterInteractions(async () => {
      await getDropdownData();
      await getData(0);
    });
  }, []);

  const getDropdownData = async () => {
    let prepare = [];
    prepare.push(dropdownBusiness.getIndustryDropdown());
    prepare.push(dropdownBusiness.getAllSkillDropdown());
    prepare.push(dropdownBusiness.getCityDropdown());
    prepare.push(dropdownBusiness.getUnitDropdown());
    let results = await Promise.all(prepare);
    if (!results.find((x) => x.data.httpCode !== 200)) {
      // Industry Dropdown
      let _industry = _.map(results[0].data.objectData, (item) => ({
        id: item.industryId,
        name: item.industryName
      }));
      _industry.unshift({ id: 0, name: t('jh.all') + ' ' + t('jh.industry') });

      // Skill Dropdown
      let _skill = _.map(results[1].data.objectData, (item) => ({
        id: item.skillId,
        name: item.skillName
      }));
      _skill.unshift({ id: 0, name: t('jh.all') + ' ' + t('jh.skill') });

      // City Dropdown
      let _city = _.map(results[2].data.objectData, (item) => ({
        id: item.cityId,
        name: item.cityName
      }));
      _city.unshift({ id: 0, name: t('jh.all') + ' ' + t('jh.location') });

      // Unit Dropdown
      let _unit = results[3].data.objectData;

      stateData.dropdown = {
        industryDropdown: _industry,
        skillDropdown: _skill,
        cityDropdown: _city,
        unitDropdown: _unit
      };
      setLastUpdate(moment().format('x'));
    }
  };

  const getData = async (page) => {
    let { keyword, industry, skill, city } = stateData.searchParams;
    let result = await jobBusiness.findJob(
      page,
      SIZE,
      keyword,
      industry,
      skill,
      city
    );
    if (result.data.httpCode === 200) {
      if (stateData.totalResult !== result.data?.objectData?.totalRecord) {
        stateData.totalResult = result.data.objectData.totalRecord;
      }
      let listJob = result.data?.objectData?.pageData ?? [];
      for (let i = 0; i < listJob.length; i++) {
        listJob[i].unitName = stateData.dropdown.unitDropdown.find(
          (x) => x.unit === listJob[i].unit
        ).unitName;
      }
      stateData.listData =
        page === 0 ? listJob : [...stateData.listData, ...listJob];
      if (listJob.length < SIZE) stateData.shouldLoadMore = false;
      stateData.searchParams.isChanged = false;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const onChangeSearchParams = (type) => (value) => {
    stateData.searchParams = {
      ...stateData.searchParams,
      [type]: value,
      isChanged: true
    };
    setLastUpdate(moment().format('x'));
  };

  const onPressSearch = async () => {
    if (stateData.searchParams.isChanged) {
      await getData(0);
    }
  };

  const onEndReached = async () => {
    if (stateData.shouldLoadMore && !stateData.loading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      stateData.loading = true;
      setLastUpdate(moment().format('x'));
      let currentPage = parseInt(stateData.listData.length / SIZE);
      await getData(currentPage);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View.Col key={index}>
        <JobItem jobData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <Common.Header
        title={t('jh.searchJob')}
        iconLeft={isBack ? 'arrow-back' : 'menu'}
        actionLeft={isBack ? goBack : openDrawer}
      />
      <View.Col style={{ marginBottom: 6 }}>
        <View.Row style={{ alignItems: 'center' }}>
          <Icon.VectorIcon
            name={'search-sharp'}
            primary
            size={22}
            style={{ position: 'absolute', zIndex: 1, left: 15 }}
          />
          <Text.TextInput
            value={stateData.searchParams.keyword}
            onChangeText={onChangeSearchParams('keyword')}
            placeholder={t('jh.searchKeywordPlaceholder')}
            placeholderTextColor={Theme.colors.dark_gray_color}
            type={'H4'}
            style={{
              flex: 1,
              height: 40,
              alignItems: 'center',
              borderWidth: 0.5,
              borderColor: Theme.colors.dark_gray_color,
              borderRadius: 8,
              margin: 5,
              paddingLeft: 36,
              paddingRight: 10,
              backgroundColor: Theme.colors.white_color
            }}
          />
        </View.Row>
        <List.DropdownButton
          icon={'md-briefcase'}
          label={t('jh.industry')}
          listItem={stateData.dropdown.industryDropdown}
          currentItem={stateData.searchParams.industry}
          onSelectItem={onChangeSearchParams('industry')}
        />
        <List.DropdownButton
          icon={'list'}
          label={t('jh.skill')}
          listItem={stateData.dropdown.skillDropdown}
          currentItem={stateData.searchParams.skill}
          onSelectItem={onChangeSearchParams('skill')}
        />
        <List.DropdownButton
          icon={'location'}
          label={t('jh.location')}
          listItem={stateData.dropdown.cityDropdown}
          currentItem={stateData.searchParams.city}
          onSelectItem={onChangeSearchParams('city')}
        />
        <Button.Button
          onPress={onPressSearch}
          style={{ marginHorizontal: 5, alignItems: 'center' }}
        >
          <Icon.VectorIcon
            name={'search-sharp'}
            color={Theme.colors.white_color}
            size={22}
            style={{ marginRight: 5 }}
          />
          <Text.H4_Bold>{t('jh.search')}</Text.H4_Bold>
        </Button.Button>
      </View.Col>
      <View.Col style={{ flex: 1, paddingHorizontal: MARGIN_ITEM }}>
        {stateData.loading && stateData.listData.length === 0 ? (
          <Loading placeholder />
        ) : stateData.listData.length === 0 ? (
          <View.Col style={{ alignItems: 'center' }}>
            <Text.BodyBold secondary fontSize={17}>
              {t('jh.noResult')}
            </Text.BodyBold>
          </View.Col>
        ) : (
          <View.Col>
            <Text.Body secondary fontSize={16} style={{ marginBottom: 5 }}>
              {t('jh.have')}{' '}
              <Text.BodyBold primary fontSize={16}>
                {stateData.totalResult}
              </Text.BodyBold>{' '}
              {t('jh.matchingResult')}
            </Text.Body>
            <FlatList
              ref={listRef}
              data={stateData.listData}
              renderItem={renderItem}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.1}
            />
          </View.Col>
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
    </View.Col>
  );
};

export default SearchJobScreen;
