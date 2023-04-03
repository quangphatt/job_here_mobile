import React, { useState, useEffect, useRef } from 'react';
import { FlatList, LayoutAnimation, ActivityIndicator } from 'react-native';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Loading from './Loading';
import Theme from '@Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const SelectionList = ({
  listItem,
  onSelectItem,
  notNull = false,
  currentItem
}) => {
  const _onSelectItem = (id) => () => {
    if (typeof onSelectItem === 'function') {
      onSelectItem(id);
    }
  };

  const renderItem = ({ item, index }) => {
    let isCurrentItem = currentItem && item.id === currentItem;

    return (
      <View.Col key={index}>
        <Button.ButtonPreventDouble
          onPress={_onSelectItem(item.id)}
          disabled={isCurrentItem}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 5
          }}
        >
          <Text.Body fontSize={17} secondary>
            {item.name}
          </Text.Body>
          {isCurrentItem && (
            <Icon.VectorIcon name={'checkmark-sharp'} size={25} primary />
          )}
        </Button.ButtonPreventDouble>
      </View.Col>
    );
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ paddingHorizontal: 20, paddingBottom: 16 }}
    >
      <FlatList data={listItem} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const ItemList = ({ getData, renderItem, size = 10, style = {} }) => {
  const [stateData, setStateData] = useState({
    listItem: [],
    shouldLoadMore: true,
    loading: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const listRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    _getData();
  }, []);

  const _getData = async () => {
    if (typeof getData === 'function') {
      let currentPage = parseInt(stateData.listItem.length / size);
      let _listItem = await getData(currentPage, size);
      stateData.listItem = [...stateData.listItem, ..._listItem];
      if (stateData.listItem.length < size * (currentPage + 1)) {
        stateData.shouldLoadMore = false;
      }
      stateData.loading = false;
      setLastUpdate(moment().format('x'));
    }
  };

  const onEndReached = async () => {
    if (stateData.shouldLoadMore && !stateData.loading) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      stateData.loading = true;
      setLastUpdate(moment().format('x'));
      await _getData();
    }
  };

  return (
    <View.Col style={{ ...style }}>
      {stateData.loading && stateData.listItem.length === 0 ? (
        <Loading placeholder />
      ) : stateData.listItem.length === 0 ? (
        <Text.Body secondary>{t('jh.noData')}</Text.Body>
      ) : (
        <FlatList
          ref={listRef}
          data={stateData.listItem}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
      {stateData.loading && stateData.listItem.length > 0 && (
        <View.Col
          style={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}
        >
          <ActivityIndicator
            color={Theme.colors.dark_gray_color}
            size="large"
          />
        </View.Col>
      )}
      {stateData.listItem.length > 0 && (
        <Button.ButtonScrollToTop listRef={listRef} isFlatList />
      )}
    </View.Col>
  );
};

export default { SelectionList, ItemList };
