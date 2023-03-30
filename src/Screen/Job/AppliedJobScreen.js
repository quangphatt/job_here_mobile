import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Icon, Common, Loading, Button } from '@Components';
import { JobItem } from '@Components/Job';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { openDrawer } from '@NavigationAction';
import { userBusiness, dropdownBusiness } from '@Business';
import Global from '@Global';

const AppliedJobScreen = () => {
  const { t } = useTranslation();
  const [stateData, setStateData] = useState({
    jobList: [],
    loading: true,
    timePicker: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    },
    unitDropdown: []
  });
  const [__lastUpdate, setLastUpdate] = useState(null);
  const LIST_MONTH = _.map([...Array(12)], (item, index) => ({
    id: index + 1,
    name: `${index < 9 ? '0' : ''}${index + 1}`
  }));
  const LIST_YEAR = _.map([...Array(5)], (item, index) => ({
    id: index + 2022,
    name: index + 2022
  }));

  useEffect(() => {
    getData();
  }, [stateData.timePicker]);

  const getData = async () => {
    stateData.loading = true;
    setLastUpdate(moment().format('x'));
    let { month, year } = stateData.timePicker;
    let result = await userBusiness.getAppliedJob(month, year);
    if (result.data.httpCode === 200) {
      if (stateData.unitDropdown.length === 0) {
        await getUnitDropdown();
      }
      let listJob = result?.data?.objectData ?? [];
      for (let i = 0; i < listJob.length; i++) {
        listJob[i].unitName = stateData.unitDropdown.find(
          (x) => x.unit === listJob[i].unit
        ).unitName;
      }
      stateData.jobList = listJob;
    }
    stateData.loading = false;
    setLastUpdate(moment().format('x'));
  };

  const getUnitDropdown = async () => {
    let _unit = await dropdownBusiness.getUnitDropdown();
    if (_unit.data.httpCode === 200) {
      stateData.unitDropdown = _unit.data?.objectData ?? [];
      setLastUpdate(moment().format('x'));
    }
  };

  const onChangeMonth = (month) => {
    stateData.timePicker = { ...stateData.timePicker, month };
    setLastUpdate(moment().format('x'));
    Global._hideModal();
  };

  const onChangeYear = (year) => {
    stateData.timePicker = { ...stateData.timePicker, year };
    setLastUpdate(moment().format('x'));
    Global._hideModal();
  };

  const onPressMonth = () => {
    Global._showModal({
      isScroll: true,
      label: t('jh.pickMonth'),
      closeOnOverlayTap: true,
      component: (
        <Common.SelectionList
          listItem={LIST_MONTH}
          onSelectItem={onChangeMonth}
          notNull
          currentItem={stateData.timePicker.month}
        />
      )
    });
  };

  const onPressYear = () => {
    Global._showModal({
      isScroll: true,
      label: t('jh.pickYear'),
      closeOnOverlayTap: true,
      component: (
        <Common.SelectionList
          listItem={LIST_YEAR}
          onSelectItem={onChangeYear}
          notNull
          currentItem={stateData.timePicker.year}
        />
      )
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View.Col key={index} style={{ paddingVertical: 5 }}>
        <JobItem jobData={item} />
      </View.Col>
    );
  };

  return (
    <View.Col>
      <Common.Header
        iconLeft={'menu'}
        title={t('jh.appliedJob')}
        actionLeft={openDrawer}
      />
      <View.Row
        style={{
          backgroundColor: Theme.colors.white_color,
          padding: 8,
          alignItems: 'center'
        }}
      >
        <Text.Body secondary style={{ flex: 1, fontSize: 16 }}>
          {t('jh.pickTime')} {'(MM-YYYY): '}
        </Text.Body>
        <Button.ButtonPreventDouble
          onPress={onPressMonth}
          style={styles.pickTime_wrapper}
        >
          <Text.Body style={styles.pickTime_text}>
            {stateData.timePicker.month < 10 && '0'}
            {stateData.timePicker.month}
          </Text.Body>
          <Icon.VectorIcon name={'chevron-down'} />
        </Button.ButtonPreventDouble>
        <Button.ButtonPreventDouble
          onPress={onPressYear}
          style={styles.pickTime_wrapper}
        >
          <Text.Body style={styles.pickTime_text}>
            {stateData.timePicker.year}
          </Text.Body>
          <Icon.VectorIcon name={'chevron-down'} />
        </Button.ButtonPreventDouble>
      </View.Row>
      <View.Col style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
        {stateData.loading ? (
          <Loading placeholder />
        ) : stateData.jobList.length === 0 ? (
          <Text.Body fontSize={16} secondary>
            {t('jh.noJobApllied')}
          </Text.Body>
        ) : (
          <FlatList data={stateData.jobList} renderItem={renderItem} />
        )}
      </View.Col>
    </View.Col>
  );
};

export default AppliedJobScreen;

const styles = StyleSheet.create({
  pickTime_wrapper: {
    flexDirection: 'row',
    width: 90,
    borderWidth: 0.5,
    borderColor: Theme.colors.primary_color,
    borderRadius: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    padding: 5
  },
  pickTime_text: {
    color: Theme.text_colors.secondary_text_color,
    fontSize: 15,
    marginLeft: 5
  }
});
