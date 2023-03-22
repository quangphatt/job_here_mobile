import React, { useState, useRef, createRef, useEffect } from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import { View, Text, Icon, Button, Loading } from '@Components';
import Theme from '@Theme';

const ITEM_SIZE = 28;
const BUTTON_SIZE = 25;
const MAX_ITEM = 5;
const CENTER_ITEM = parseInt((MAX_ITEM - 1) / 2);
const { width } = Dimensions.get('window');

const Pagination = ({
  listData = [],
  dataLength = 0,
  renderItem,
  currentItem = 0,
  singlePage = false,
  getData
}) => {
  const [stateData, setStateData] = useState({
    currentItem: currentItem,
    viewableItems: [],
    listRef: createRef(),
    paginationRef: createRef(),
    loading: true
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const viewabilityConfigCallbackPairs = useRef([
    { _viewabilityConfig, onViewableItemsChanged }
  ]);

  useEffect(() => {
    _getData(0);
  }, []);

  let showButton = dataLength > MAX_ITEM;

  const _getData = async (idx) => {
    await getData(idx, 1);
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const onViewableItemsChanged = ({ viewableItems, changed }) => {};

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 100
  };

  const onChangeCurrentItem = (idx) => async () => {
    if (idx >= 0 && idx < dataLength) {
      stateData.currentItem = idx;
      stateData.paginationRef.scrollToIndex({
        index: idx - CENTER_ITEM > 0 ? idx - CENTER_ITEM : 0
      });
      setLastUpdate(moment().format('x'));
      if (singlePage) {
        stateData.loading = true;
        setLastUpdate(moment().format('x'));
        await _getData(idx);
      } else {
        stateData.listRef.scrollToIndex({
          index: idx
        });
        setLastUpdate(moment().format('x'));
      }
    }
  };

  const _renderPaginationItem = ({ item, index }) => {
    return (
      <Button.ButtonPreventDouble
        key={index}
        disabled={index === stateData.currentItem}
        onPress={onChangeCurrentItem(index)}
      >
        <View.Col
          style={[
            styles.PaginationItem,
            index === stateData.currentItem
              ? styles.PaginationItem_Current
              : styles.PaginationItem_NoCurrent
          ]}
        >
          <Text.BodyBold
            style={[
              styles.PaginationItem_Text,
              index === stateData.currentItem
                ? styles.PaginationItem_Text_Current
                : styles.PaginationItem_Text_NoCurrent
            ]}
          >
            {index + 1}
          </Text.BodyBold>
        </View.Col>
      </Button.ButtonPreventDouble>
    );
  };

  return (
    <View.Col style={{ justifyContent: 'center', alignItems: 'center' }}>
      {stateData.loading ? (
        <Loading placeholder />
      ) : singlePage ? (
        renderItem({ item: listData[0] })
      ) : (
        <FlatList
          ref={(r) => (stateData.listRef = r)}
          data={listData}
          horizontal
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          scrollEnabled={false}
          pagingEnabled
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      )}
      {dataLength > 1 && (
        <View.Row
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: width * 0.7
          }}
        >
          {showButton && (
            <View.Row>
              <Button.ButtonPreventDouble onPress={onChangeCurrentItem(0)}>
                <Icon.VectorIcon name={'play-skip-back'} size={BUTTON_SIZE} />
              </Button.ButtonPreventDouble>
              <Button.ButtonPreventDouble
                onPress={onChangeCurrentItem(stateData.currentItem - 1)}
              >
                <Icon.VectorIcon name={'caret-back'} size={BUTTON_SIZE} />
              </Button.ButtonPreventDouble>
            </View.Row>
          )}
          <FlatList
            horizontal
            ref={(r) => (stateData.paginationRef = r)}
            data={[...Array(dataLength)]}
            renderItem={_renderPaginationItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: dataLength >= MAX_ITEM ? null : 1
            }}
          />
          {showButton && (
            <View.Row>
              <Button.ButtonPreventDouble
                onPress={onChangeCurrentItem(stateData.currentItem + 1)}
              >
                <Icon.VectorIcon name={'caret-forward'} size={BUTTON_SIZE} />
              </Button.ButtonPreventDouble>
              <Button.ButtonPreventDouble
                onPress={onChangeCurrentItem(listData.length - 1)}
              >
                <Icon.VectorIcon
                  name={'play-skip-forward'}
                  size={BUTTON_SIZE}
                />
              </Button.ButtonPreventDouble>
            </View.Row>
          )}
        </View.Row>
      )}
    </View.Col>
  );
};

const styles = StyleSheet.create({
  PaginationItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: ITEM_SIZE / 2,
    marginHorizontal: 5
  },
  PaginationItem_NoCurrent: {
    borderColor: Theme.colors.primary_color,
    backgroundColor: Theme.colors.white_color
  },
  PaginationItem_Current: {
    borderColor: Theme.colors.primary_color,
    backgroundColor: Theme.colors.primary_color
  },
  PaginationItem_Text: {},
  PaginationItem_Text_Current: {},
  PaginationItem_Text_NoCurrent: {
    color: Theme.text_colors.primary_text_color
  }
});

export default Pagination;
