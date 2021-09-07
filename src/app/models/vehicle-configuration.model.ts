import { CompanyConfiguration } from './company-configuration.model';
import { VehicleService } from './vehicle-service.model';

export class VehicleConfiguration {
  id?: String;
  vehicleName?: String;
  company?: CompanyConfiguration;
  vehicleServices?: VehicleService[];
  consuptionInLiters?: number;
  vehicleEngine?: number;
}
