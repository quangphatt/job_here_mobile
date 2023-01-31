import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button, Icon, Common, Image } from '@Components';
import { CompanyHeader, CompanyInfo, CompanyShare } from '@Components/Company';
import { useTranslation } from 'react-i18next';
import Global from '@Global';

const _testData_companyJob = [
  {
    applicationId: 13,
    jobId: 19,
    jobName: 'Automation Tester',
    companyId: 14,
    companyName: 'Công ty KMS Solution',
    avatarUrl:
      'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672474639399-download.png',
    salaryMin: 1000,
    salaryMax: 1200,
    unit: 'ENGLISH',
    cityId: 1,
    createdDate: '2022-11-21T21:38:12.196+07:00',
    viewed: true,
    unitName: '$'
  },
  {
    applicationId: 4,
    jobId: 5,
    jobName: 'FullStack C# .Net',
    companyId: 13,
    companyName: 'Công ty FPT Software',
    avatarUrl:
      'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672475066068-download_(1).png',
    salaryMin: 1000,
    salaryMax: 1000,
    unit: 'VIETNAM',
    cityId: 1,
    createdDate: '2022-11-13T23:47:39.098+07:00',
    viewed: true,
    unitName: 'Million VND'
  },
  {
    applicationId: 8,
    jobId: 7,
    jobName: 'FullStack React',
    companyId: 13,
    companyName: 'Công ty FPT Software',
    avatarUrl:
      'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672475066068-download_(1).png',
    salaryMin: 1000,
    salaryMax: 1000,
    unit: 'VIETNAM',
    cityId: 1,
    createdDate: '2022-11-13T16:51:16.866+07:00',
    endDate: '2023-02-15',
    unitName: 'Million VND'
  }
];

const _testData = {
  companyId: 13,
  companyName: 'Công ty FPT Software',
  address: '192 Hoàng Diệu 2',
  size: '1000 - 2000',
  description:
    '<ul><li><strong>Là thành viên thuộc Tập đoàn công nghệ hàng đầu Việt Nam FPT, Công ty Cổ phần Viễn thông FPT (tên gọi tắt là FPT Telecom) hiện là một trong <u>những nhà cung cấp dịch vụ viễn thông và Internet có uy tín và được khách hàng yêu mến tại Việt Nam và khu vực.</u></strong></li><li><strong><em>Thành lập ngày 31/01/1997, khởi nguồn từ Trung tâm Dịch vụ Trực tuyến do 4 thành viên sáng lập cùng sản phẩm mạng Intranet đầu tiên của Việt Nam mang tên “Trí tuệ Việt Nam – TTVN”, sản phẩm được coi là đặt nền móng cho sự phát triển của Internet tại Việt Nam. Sau 20 năm hoạt động, FPT Telecom đã lớn mạnh vượt bậc với hơn 7,000 nhân viên chính thức, gần 200 văn phòng điểm giao dịch thuộc hơn 80 chi nhánh tại 59 tỉnh thành trên toàn quốc. Bên cạnh đó, Công ty đã và đang đặt dấu ấn trên trường quốc tế bằng 8 chi nhánh trải dài khắp Campuchia, cũng như việc được cấp giấy phép kinh doanh dịch vụ tại Myanmar.</em></strong></li><li><strong><em>Với sứ mệnh tiên phong đưa Internet đến với người dân Việt Nam và mong muốn mỗi gia đình Việt Nam đều sử dụng ít nhất một dịch vụ của FPT Telecom, đồng hành cùng phương châm “Khách hàng là trọng tâm”, chúng tôi không ngừng nỗ lực đầu tư hạ tầng, nâng cấp chất lượng sản phẩm – dịch vụ, tăng cường ứng dụng công nghệ mới để mang đến cho khách hàng những trải nghiệm sản phẩm dịch vụ vượt trội.</em></strong></li></ul>',
  urlCompany: 'www.fpt-software.com/',
  valid_urlCompany: 'www.fpt-software.com/',
  email: 'fhcm.contact@fsoft.com.vn',
  avatarUrl:
    'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1672475066068-download_(1).png',
  backgroundUrl:
    'https://storage.googleapis.com/jobhere-server.appspot.com/image/1/1668504111499-company_default_background.jpg',
  createdDate: '2022-10-09T03:27:49.345+07:00',
  companyJobs: _testData_companyJob
};

const CompanyInfoScreen = () => {
  const [companyData, setCompanyData] = useState(_testData);
  const { t } = useTranslation();

  const getValidUrl = (url = '') => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, '');

    if (/^(:\/\/)/.test(newUrl)) {
      return `https${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `https://${newUrl}`;
    }

    return newUrl;
  };

  const onPressBack = () => {};

  const onPressShare = () => {
    Global._showModal({
      label: t('jh.shareCompany'),
      closeOnOverlayTap: true,
      component: <CompanyShare path={`/Company/${companyData.companyId}`} />
    });
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <Common.Header
        title={companyData.companyName}
        actionLeft={onPressBack}
        iconRight={'share-social'}
        actionRight={onPressShare}
      />
      <CompanyHeader companyData={companyData} />
      <CompanyInfo companyData={companyData} />
    </ScrollView>
  );
};

export default CompanyInfoScreen;
