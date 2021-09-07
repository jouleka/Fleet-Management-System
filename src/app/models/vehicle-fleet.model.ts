import { VehicleConfiguration } from './vehicle-configuration.model';
import { CompanyConfiguration } from './company-configuration.model';

export class VehicleFLeet {
  id?: String;
  name?: String;
  company?: CompanyConfiguration;
  vehicles?: VehicleConfiguration[];
}
