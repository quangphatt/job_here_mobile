import React, { useEffect, useState } from 'react';
import { View, Text, Common, List } from '@Components';
import { JobItem } from '@Components/Job';
import Theme from '@Theme';
import { useTranslation } from 'react-i18next';
import { jobBusiness, dropdownBusiness } from '@Business';
import { openDrawer } from '@NavigationAction';

const SIZE = 10;
const MARGIN_ITEM = 10;

const SavedJobScreen = () => {
  const [unitDropdown, setUnitDropdown] = useState([]);
  const { t } = useTranslation();

  const getData = async (page, size) => {
    let result = await jobBusiness.getSavedJob(page, size);
    if (result.data.httpCode === 200) {
      if (unitDropdown.length === 0) {
        await getUnitDropdown();
      }
      let listJob = result?.data?.objectData?.pageData ?? [];
      for (let i = 0; i < listJob.length; i++) {
        listJob[i].unitName =
          unitDropdown.find((x) => x.unit === listJob[i].unit)?.unitName ?? '';
      }
      return listJob;
    }
    return [];
  };

  const getUnitDropdown = async () => {
    let _unit = await dropdownBusiness.getUnitDropdown();
    if (_unit.data.httpCode === 200) {
      let _unitDropdown = _unit.data?.objectData ?? [];
      setUnitDropdown(_unitDropdown);
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
      <List.ItemList
        getData={getData}
        renderItem={renderItem}
        size={SIZE}
        style={{ flex: 1, paddingVertical: MARGIN_ITEM / 2 }}
      />
    </View.Col>
  );
};

export default SavedJobScreen;
