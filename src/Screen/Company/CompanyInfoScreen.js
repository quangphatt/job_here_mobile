import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Share } from 'react-native';
import { View, Button, Common, Loading } from '@Components';
import { CompanyHeader, CompanyInfo } from '@Components/Company';
import { companyBusiness, dropdownBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { fe_host } from '@Config/Service/Host';
import { goBack } from '@NavigationAction';

const CompanyInfoScreen = (props) => {
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let companyId = props?.route?.params?.companyId ?? 0;
    if (companyId) {
      let prepare = [];
      prepare.push(companyBusiness.getCompanyInfo(companyId));
      prepare.push(companyBusiness.getJobOfCompany(companyId));
      prepare.push(dropdownBusiness.getUnitDropdown());
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let _companyData = results[0].data.objectData;
        let unitData = results[2].data.objectData;
        _companyData.companyJobs = results[1].data.objectData || [];
        _companyData.valid_urlCompany = _companyData.urlCompany;
        _companyData.companyJobs.map((job) => {
          job.unitName = unitData.find((x) => x.unit === job.unit).unitName;
          return job;
        });
        setCompanyData(_companyData);
      }
    }
    setLoading(false);
  };

  const onPressShare = async () => {
    try {
      if (!!companyData?.companyId) {
        let result = await Share.share({
          message: `${fe_host}/Company/${companyData.companyId}`
        });
      }
    } catch (error) {
      console.log('Error while sharing company!!!', error);
    }
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} ref={listRef}>
        <Common.Header
          title={companyData?.companyName ?? t('jh.companyDetail')}
          actionLeft={goBack}
          iconRight={'share-social'}
          actionRight={onPressShare}
        />
        {loading ? (
          <Loading placeholder screen />
        ) : (
          <View.Col>
            <CompanyHeader companyData={companyData} />
            <CompanyInfo companyData={companyData} />
          </View.Col>
        )}
      </ScrollView>
      {!loading && <Button.ButtonScrollToTop listRef={listRef} />}
    </View.Col>
  );
};

export default CompanyInfoScreen;
