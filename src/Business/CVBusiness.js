import Service from '@Config/Service';
import { getListCVURL } from '@Config/Service/ConfigURL';

class CVBusiness extends Service {
  getListCV = async () => {
    let result = await this.get(getListCVURL);
    return result;
  };
}

const cvBusiness = new CVBusiness();

export default cvBusiness;
