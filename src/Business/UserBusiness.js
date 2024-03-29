import Service from '@Config/Service';
import {
  getAppliedJobURL,
  saveCVURL,
  deleteCVURL,
  applyJobURL,
  updateUserInfoURL,
  changePasswordURL
} from '@Config/Service/ConfigURL';

class UserBusiness extends Service {
  getAppliedJob = async (month, year) => {
    let result = await this.get(
      `${getAppliedJobURL}?month=${year}-${month < 10 ? '0' + month : month}`
    );
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

  applyJob = async (jobId, cvId, note) => {
    let params = { cvId, jobId, note };
    let result = await this.post(applyJobURL, params);
    return result;
  };

  updateUserInfo = async (
    fullname,
    address,
    dateOfBirth,
    phone,
    gender,
    imageUrl
  ) => {
    let params = {
      fullname,
      address,
      dateOfBirth,
      phone,
      gender,
      imageUrl
    };
    let result = await this.post(updateUserInfoURL, params);
    return result;
  };

  changePassword = async (oldPassword, newPassword) => {
    let params = {
      oldPassword,
      newPassword
    };
    let result = await this.post(changePasswordURL, params);
    return result;
  };
}

const userBusiness = new UserBusiness();

export default userBusiness;
