import Service from '@Config/Service';
import { getAppliedJobURL } from '@Config/Service/ConfigURL';

class UserBusiness extends Service {
  getAppliedJob = async (month, year) => {
    let result = await this.get(`${getAppliedJobURL}?month=${year}-${month}`);
    return result;
  };
}

const userBusiness = new UserBusiness();

export default userBusiness;
