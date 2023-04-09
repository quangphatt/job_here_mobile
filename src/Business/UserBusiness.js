import Service from '@Config/Service';
import {
  getAppliedJobURL,
  saveCVURL,
  deleteCVURL
} from '@Config/Service/ConfigURL';

class UserBusiness extends Service {
  getAppliedJob = async (month, year) => {
    let result = await this.get(`${getAppliedJobURL}?month=${year}-${month}`);
    return result;
  };

  saveCV = async (cvUrl, cvName) => {
    let result = await this.post(saveCVURL, { cvUrl, cvName });
    return result;
  };

  deleteCV = async (cvId) => {
    let result = await this.post(`${deleteCVURL}/${cvId}`);
    return result;
  };
}

const userBusiness = new UserBusiness();

export default userBusiness;
