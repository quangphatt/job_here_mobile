import Service from '@Config/Service';
import {
  countNotificationURL,
  getLastsNotificationOfUserURL,
  viewNotificationURL,
  viewNotificationOfUserURL
} from '@Config/Service/ConfigURL';

class NotificationBusiness extends Service {
  countNotification = async () => {
    let result = await this.get(countNotificationURL);
    return result;
  };

  getLastsNotificationOfUser = async () => {
    let result = await this.get(getLastsNotificationOfUserURL);
    return result;
  };

  viewNotification = async (notiId) => {
    let result = await this.post(`${viewNotificationURL}/${notiId}`);
    return result;
  };

  viewNotificationOfUser = async () => {
    let result = await this.post(`${viewNotificationOfUserURL}`);
    return result;
  };
}

const notificationBusiness = new NotificationBusiness();

export default notificationBusiness;
