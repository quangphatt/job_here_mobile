import Service from '@Config/Service';
import {
  getListNewJobURL,
  getListJobInterestingURL
} from '@Config/Service/ConfigURL';

class JobBusiness extends Service {
  getListNewJob = async () => {
    let result = await this.get(getListNewJobURL);
    return result;
  };
  getListJobInteresting = async (page, size) => {
    let result = await this.get(
      `${getListJobInterestingURL}?page=${page}&size=${size}`
    );
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
