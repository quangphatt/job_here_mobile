import Service from '@Config/Service';
import {
  getListNewJobURL,
  getListJobInterestingURL,
  getJobInfoURL,
  saveJobURL,
  unsavedJobURL,
  getSavedJobURL,
  getAllSavedJobIdURL
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

  saveJob = async (jobId) => {
    let result = await this.post(`${saveJobURL}/${jobId}`);
    return result;
  };

  unsaveJob = async (jobId) => {
    let result = await this.post(`${unsavedJobURL}/${jobId}`);
    return result;
  };

  getSavedJob = async (page, size) => {
    let result = await this.get(`${getSavedJobURL}?page=${page}&size=${size}`);
    return result;
  };

  getAllSavedJobId = async () => {
    let result = await this.get(getAllSavedJobIdURL);
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
