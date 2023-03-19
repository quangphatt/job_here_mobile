import Service from '@Config/Service';
import { unitDropdownURL } from '@Config/Service/ConfigURL';

class DropdownBusiness extends Service{
  getUnitDropdown = async () => {
    let result = await this.get(unitDropdownURL);
    return result;
  };
}

const dropdownBusiness=new DropdownBusiness()

export default dropdownBusiness;
