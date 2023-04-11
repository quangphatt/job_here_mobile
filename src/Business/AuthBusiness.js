import Service from '@Config/Service';
import {
  signInURL,
  getSessionURL,
  signUpURL,
  authCodeURL,
  refreshTokenURL
} from '@Config/Service/ConfigURL';

class AuthBusiness extends Service {
  signIn = async (email, password) => {
    let params = {
      email,
      password
    };
    let result = await this.post(signInURL, params);
    return result;
  };

  getSessionInfo = async () => {
    let result = await this.get(getSessionURL);
    return result;
  };

  signUp = async (email, password, fullname, dateOfBirth, phone) => {
    let params = {
      email,
      password,
      fullname,
      dateOfBirth,
      phone
    };
    let result = await this.post(signUpURL, params);
    return result;
  };

  authCode = async (code) => {
    let params = { code };
    let result = await this.post(authCodeURL, params);
    return result;
  };

  refreshToken = async (email, password, token) => {
    let result = await this.post(
      refreshTokenURL,
      { email, password },
      { refreshToken: token, Authorization: null }
    );
    return result;
  };
}

const authBusiness = new AuthBusiness();

export default authBusiness;
