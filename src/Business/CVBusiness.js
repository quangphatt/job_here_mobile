import Service from '@Config/Service';
import { getListCVURL, getCVContentURL } from '@Config/Service/ConfigURL';

class CVBusiness extends Service {
  getListCV = async () => {
    let result = await this.get(getListCVURL);
    return result;
  };

  getCVContent = async (cvId) => {
    let result = await this.get(`${getCVContentURL}/{cvId}`);
    return result;
  };
}

const cvBusiness = new CVBusiness();

export default cvBusiness;
