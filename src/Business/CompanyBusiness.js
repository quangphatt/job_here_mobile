import Service from '@Config/Service';
import { getTopCompanyURL } from '@Config/Service/ConfigURL';

class CompanyBusiness extends Service {
  getListTopCompany = async () => {
    let result = await this.get(getTopCompanyURL);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
