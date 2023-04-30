import Service from '@Config/Service';
import {
  getTopCompanyURL,
  getCompanyInfoURL,
  getAllJobOfCompanyURL,
  getListCompanyURL,
  getCompanyScoreURL,
  getListCommentURL,
  addCommentURL
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

  getCompanyScore = async (companyId) => {
    let result = await this.get(`${getCompanyScoreURL}/${companyId}`);
    return result;
  };

  getListComment = async (companyId, page, size) => {
    let params = { companyId, page, size };
    let result = await this.get(getListCommentURL, params);
    return result;
  };

  addComment = async (params) => {
    let result = await this.post(addCommentURL, params);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
