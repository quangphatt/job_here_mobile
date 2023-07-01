import Service from '@Config/Service';
import { getTotalJobByIndustryURL } from '@Config/Service/ConfigURL';

class ReportBusiness extends Service {
  getTotalJobByIndustry = async (limit) => {
    let result = await this.get(getTotalJobByIndustryURL, { limit });
    return result;
  };
}

const reportBusiness = new ReportBusiness();

export default reportBusiness;
