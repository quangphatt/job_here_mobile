import React, { useEffect, useState, useRef } from 'react';
import { FlatList, LayoutAnimation, ActivityIndicator } from 'react-native';
import { View, Text, Icon, Common, Button, Loading, List } from '@Components';
import Theme from '@Theme';
import { BlogItem } from '@Components/Blog';
import { useTranslation } from 'react-i18next';
import { goBack, openDrawer } from '@NavigationAction';
import { blogBusiness, dropdownBusiness } from '@Business';

const SIZE = 10;
const MARGIN_ITEM = 10;

const BlogScreen = (props) => {
  const { t } = useTranslation();
  let isBack = props?.route?.params?.isBack ?? false;
  const [stateData, setStateData] = useState({
    listData: [],
    shouldLoadMore: true,
    loading: true,
    loadingSearch: true,
    industryDropdown: [],
    searchParams: {
      keyword: '',
      industry: null,
      isChanged: false
    }
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    getDropdown();
    getData(0);
  }, []);

  const getData = async (page) => {
    if (page === 0) {
      stateData.loadingSearch = true;
      setLastUpdate(moment().format('x'));
    }
    let res = await blogBusiness.blogSearch({
      keySearch: stateData.searchParams.keyword,
      industryId: !stateData.searchParams.industry
        ? null
        : stateData.searchParams.industry,
      page,
      size: SIZE
    });
    if (res.data.httpCode === 200) {
      let _listBlog = res.data?.objectData?.pageData ?? [];
      stateData.listData =
        page === 0 ? _listBlog : [...stateData.listData, ..._listBlog];
      if (_listBlog.length < SIZE) stateData.shouldLoadMore = false;
      stateData.searchParams.isChanged = false;
    }
    stateData.loading = false;
    stateData.loadingSearch = false;
    setLastUpdate(moment().format('x'));
  };

  const getDropdown = async () => {
    let res = await dropdownBusiness.getIndustryDropdown();
    if (res.data.httpCode === 200) {
      let _industry = _.map(res.data.objectData, (item) => ({
        id: item.industryId,
        name: item.industryName
      }));
      _industry.unshift({ id: 0, name: t('jh.all') + ' ' + t('jh.industry') });
      stateData.industryDropdown = _industry;
      setLastUpdate(moment().format('x'));
    }
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
        <BlogItem blogData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <Common.Header
        iconLeft={isBack ? 'arrow-back' : 'menu'}
        title={t('jh.allBlog')}
        actionLeft={isBack ? goBack : openDrawer}
      />
      <View.Col>
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
            placeholder={t('jh.searchBlogPlaceholder')}
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
          listItem={stateData.industryDropdown}
          currentItem={stateData.searchParams.industry}
          onSelectItem={onChangeSearchParams('industry')}
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
        {(stateData.loading && stateData.listData.length === 0) ||
        stateData.loadingSearch ? (
          <Loading placeholder />
        ) : stateData.listData.length === 0 ? (
          <View.Col style={{ alignItems: 'center' }}>
            <Text.BodyBold secondary fontSize={17}>
              {t('jh.noResult')}
            </Text.BodyBold>
          </View.Col>
        ) : (
          <View.Col>
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

export default BlogScreen;
