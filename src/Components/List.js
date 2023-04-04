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

const ListEmpty = () => {
  const { t } = useTranslation();

  return (
    <View.Col style={{ padding: 10, alignItems: 'center' }}>
      <Text.H4 secondary>{t('jh.noData')}</Text.H4>
    </View.Col>
  );
};

export default { SelectionList, ListEmpty };
