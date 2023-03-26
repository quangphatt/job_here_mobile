import Service from '@Config/Service';
import {
  getTopCompanyURL,
  getCompanyInfoURL,
  getAllJobOfCompanyURL
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

  getListTopCompany = async () => {
    let result = await this.get(getTopCompanyURL);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
