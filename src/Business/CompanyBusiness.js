import Service from '@Config/Service';
import {
  getTopCompanyURL,
  getCompanyInfoURL,
  getAllJobOfCompanyURL,
  getListCompanyURL
} from '@Config/Service/ConfigURL';

class CompanyBusiness extends Service {
  getCompanyInfo = async (companyId) => {
    let result = await this.get(`${getCompanyInfoURL}/${companyId}`);
    return result;
  };

  getJobOfCompany = async (companyId) => {
    let result = await this.get(`${getAllJobOfCompanyURL}/${companyId}`);
    return result;
  };

  getListCompany = async (page, size) => {
    let params = { page, size };
    let result = await this.get(getListCompanyURL, params);
    return result;
  };

  getListTopCompany = async () => {
    let result = await this.get(getTopCompanyURL);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
