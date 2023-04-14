import React from 'react';
import { FlatList } from 'react-native';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Loading from './Loading';
import Theme from '@Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Global from '@Global';

const SelectionList = ({
  listItem,
  onSelectItem,
  notNull = false,
  currentItem
}) => {
  const _onSelectItem = (id) => () => {
    if (typeof onSelectItem === 'function') {
      Global._hideModal();
      onSelectItem(id);
    }
  };

  const renderItem = ({ item, index }) => {
    let isCurrentItem = item.id === currentItem;

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
          <Text.Body fontSize={17} secondary style={{ flex: 1 }}>
            {item.name}
          </Text.Body>
          {isCurrentItem && (
            <Icon.VectorIcon
              name={'checkmark-sharp'}
              size={25}
              primary
              style={{ marginLeft: 5 }}
            />
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

const DropdownButton = ({
  icon,
  listItem = [],
  currentItem,
  onSelectItem,
  label,
  style = {}
}) => {
  const { t } = useTranslation();
  let currentLabel =
    _.find(listItem, (item) => item.id === currentItem)?.name ?? label;

  const onPressDropdown = () => {
    Global._showModal({
      isScroll: true,
      label,
      closeOnOverlayTap: true,
      component: (
        <SelectionList
          listItem={listItem}
          onSelectItem={onSelectItem}
          currentItem={currentItem}
        />
      )
    });
  };

  return (
    <Button.ButtonPreventDouble
      onPress={onPressDropdown}
      style={[
        {
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 36,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
          backgroundColor: Theme.colors.white_color,
          borderColor: Theme.colors.dark_gray_color,
          borderRadius: 8,
          borderWidth: 0.5
        },
        style
      ]}
      activeOpacity={0.7}
    >
      {!!icon && (
        <Icon.VectorIcon
          name={icon}
          primary
          size={20}
          style={{ marginRight: 6 }}
        />
      )}
      <Text.H4 secondary numberOfLines={1} style={{ flex: 1 }}>
        {currentLabel}
      </Text.H4>
      <Icon.VectorIcon
        name={'chevron-down'}
        size={22}
        style={{ position: 'absolute', right: 10 }}
      />
    </Button.ButtonPreventDouble>
  );
};

const ListEmpty = () => {
  const { t } = useTranslation();

  return (
    <View.Col style={{ padding: 10, alignItems: 'center' }}>
      <Text.H4 secondary>{t('jh.noData')}</Text.H4>
    </View.Col>
  );
};

export default { SelectionList, ListEmpty, DropdownButton };
