import Service from '@Config/Service';
import { getBlogByIdURL, blogSearchURL } from '@Config/Service/ConfigURL';

class BlogBusiness extends Service {
  getBlogById = async (blogId, isGetRefs = false) => {
    let params = {
      isGetRefs
    };
    let result = await this.get(`${getBlogByIdURL}/${blogId}`, params);
    return result;
  };

  blogSearch = async ({ keySearch, industryId, page, size }) => {
    let result = await this.get(blogSearchURL, {
      keySearch,
      industryId,
      page,
      size
    });
    return result;
  };
}

const blogBusiness = new BlogBusiness();

export default blogBusiness;
