import Service from '@Config/Service';
import {
  getListNewJobURL,
  getListJobInterestingURL,
  getJobInfoURL
} from '@Config/Service/ConfigURL';

class JobBusiness extends Service {
  getJobInfo = async (jobId) => {
    let result = await this.get(`${getJobInfoURL}/${jobId}`);
    return result;
  };

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
