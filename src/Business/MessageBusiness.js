import Service from '@Config/Service';
import {
  getListMessageURL,
  sendMessageURL,
  countUnreadMessageURL,
  viewAllMessageURL,
  deleteMessageURL
} from '@Config/Service/ConfigURL';

class MessageBusiness extends Service {
  getListMessage = async () => {
    let result = await this.get(getListMessageURL);
    return result;
  };

  getListChildMessage = async (messageId) => {
    let result = await this.get(`${getListMessageURL}/${messageId}`);
    return result;
  };

  sendMessage = async ({ userId, companyId, fromUser, content }) => {
    let result = await this.post(sendMessageURL, {
      userId,
      companyId,
      fromUser,
      content
    });
    return result;
  };

  countUnreadMessage = async () => {
    let result = await this.get(countUnreadMessageURL);
    return result;
  };

  viewAllMessage = async (messageId) => {
    let result = await this.post(`${viewAllMessageURL}/${messageId}`);
    return result;
  };

  deleteMessage = async (messageId) => {
    let result = await this.post(`${deleteMessageURL}/${messageId}`);
    return result;
  };
}

const messageBusiness = new MessageBusiness();

export default messageBusiness;
