import Service from '@Config/Service';
import {
  genderDropdownURL,
  unitDropdownURL,
  industryDropdownURL,
  skillDropdownURL,
  experienceDropdownURL,
  titleDropdownURL,
  jobtypeDropdownURL,
  cityDropdownURL
} from '@Config/Service/ConfigURL';

class DropdownBusiness extends Service {
  getGenderDropdown = async () => {
    let result = await this.get(genderDropdownURL);
    return result;
  };

  getUnitDropdown = async () => {
    let result = await this.get(unitDropdownURL);
    return result;
  };

  getIndustryDropdown = async () => {
    let result = await this.get(industryDropdownURL);
    return result;
  };

  getAllSkillDropdown = async () => {
    let result = await this.get(skillDropdownURL);
    return result;
  };

  getSkillDropdown = async (skillId) => {
    let result = await this.get(`${skillDropdownURL}/${skillId}`);
    return result;
  };

  getExperienceDropdown = async () => {
    let result = await this.get(experienceDropdownURL);
    return result;
  };

  getTitleDropdown = async () => {
    let result = await this.get(titleDropdownURL);
    return result;
  };

  getJobtypeDropdown = async () => {
    let result = await this.get(jobtypeDropdownURL);
    return result;
  };

  getCityDropdown = async () => {
    let result = await this.get(cityDropdownURL);
    return result;
  };
}

const dropdownBusiness = new DropdownBusiness();

export default dropdownBusiness;
