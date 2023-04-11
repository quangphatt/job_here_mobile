import Service from '@Config/Service';
import { uploadCVURL, uploadImageURL } from '@Config/Service/ConfigURL';

class UploadBusiness extends Service {
  uploadCV = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    let result = await this.upload(uploadCVURL, formData);
    return result;
  };

  // uploadImage = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   let result = await this.upload(uploadImageURL, formData);
  //   return result;
  // };
}

const uploadBusiness = new UploadBusiness();

export default uploadBusiness;
