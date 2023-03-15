import Service from '@Config/Service';
import { getListNewJobURL } from '@Config/Service/ConfigURL';

class JobBusiness extends Service {
  getListNewJob = async () => {
    let result = await this.get(getListNewJobURL);
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
