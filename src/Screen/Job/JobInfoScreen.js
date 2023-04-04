import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Share } from 'react-native';
import { View, Button, Common, Loading } from '@Components';
import { JobHeader, JobInfo } from '@Components/Job';
import { jobBusiness, dropdownBusiness } from '@Business';
import { useTranslation } from 'react-i18next';
import { fe_host } from '@Config/Service/Host';
import { goBack } from '@NavigationAction';

const JobInfoScreen = (props) => {
  const { t } = useTranslation();
  const [jobData, setJobData] = useState({});
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let jobId = props?.route?.params?.jobId ?? 0;
    if (jobId) {
      let prepare = [];
      prepare.push(dropdownBusiness.getUnitDropdown());
      prepare.push(dropdownBusiness.getExperienceDropdown());
      prepare.push(dropdownBusiness.getJobtypeDropdown());
      prepare.push(dropdownBusiness.getTitleDropdown());
      prepare.push(jobBusiness.getJobInfo(jobId));
      prepare.push(dropdownBusiness.getCityDropdown());
      prepare.push(dropdownBusiness.getGenderDropdown());
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let unit = results[0].data.objectData;
        let experience = results[1].data.objectData;
        let jobType = results[2].data.objectData;
        let title = results[3].data.objectData;
        let city = results[5].data.objectData;
        let data = results[4].data.objectData;
        let gender = results[6].data.objectData;

        let u = unit.find((x) => x.unit === data.unit);
        if (u) data.unitName = u.unitName;

        let g = gender.find((x) => x.gender === data.gender);
        if (g) data.genderName = g.genderName;

        data.experienceNames = [];
        data.experiences.forEach((element) => {
          let ex = experience.find((e) => e.experience === element);
          if (ex) data.experienceNames.push(ex);
        });

        data.jobTypeNames = [];
        data.jobTypes.forEach((element) => {
          let ex = jobType.find((e) => e.jobType === element);
          if (ex) data.jobTypeNames.push(ex);
        });

        let t = title.find((x) => x.title === data.title);
        if (t) data.titleName = t.titleName;

        let c = city.find((x) => x.cityId === data.cityId);
        if (c) data.cityName = c.cityName;
        setJobData(data);
      }
      setLoading(false);
    }
  };

  const onPressShare = async () => {
    try {
      if (!!jobData?.jobId) {
        let result = await Share.share({
          message: `${fe_host}/Job/${jobData.jobId}`
        });
      }
    } catch (error) {
      console.log('Error while sharing job!!!', error);
    }
  };

  return (
    <View.Col style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]} ref={listRef}>
        <Common.Header
          title={jobData?.jobName ?? t('jh.jobDetail')}
          actionLeft={goBack}
          iconRight={'share-social'}
          actionRight={onPressShare}
        />
        {loading ? (
          <Loading placeholder screen />
        ) : (
          <View.Col>
            <JobHeader jobData={jobData} inJobScreen />
            <JobInfo jobData={jobData} />
          </View.Col>
        )}
      </ScrollView>
      {!loading && <Button.ButtonScrollToTop listRef={listRef} />}
    </View.Col>
  );
};

export default JobInfoScreen;
