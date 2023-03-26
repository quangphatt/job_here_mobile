import axios from 'axios';
import { host } from './Host';
import { store } from '@Config/Redux/store';
import NetInfo from '@react-native-community/netinfo';

class Service {
  post = async (suburl, params = {}, headerParams = {}) => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      let url = host + suburl;
      let headers = store?.getState?.()?.HeaderRequest?.headers ?? {};
      let result = await axios.post(url, params, {
        headers: { ...headers, ...headerParams }
      });
      return result;
    }
    return null;
  };

  get = async (suburl, params = {}, headerParams = {}) => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      let url = host + suburl;
      let headers = store?.getState?.()?.HeaderRequest?.headers ?? {};
      let result = await axios.get(url, {
        params: { ...params },
        headers: { ...headers, ...headerParams }
      });
      return result;
    }
    return null;
  };
}

export default Service;
