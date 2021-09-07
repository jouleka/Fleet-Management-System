import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { UpdateVehicleServiceComponent } from './vehicle-service/update-vehicle-service/update-vehicle-service.component';
import { AddVehicleServiceComponent } from './vehicle-service/add-vehicle-service/add-vehicle-service.component';
import { VehicleServiceComponent } from './vehicle-service/vehicle-service.component';
import { UpdateVehicleFleetComponent } from './vehicle-fleet/update-vehicle-fleet/update-vehicle-fleet.component';
import { AddVehicleFleetComponent } from './vehicle-fleet/add-vehicle-fleet/add-vehicle-fleet.component';
import { VehicleFleetComponent } from './vehicle-fleet/vehicle-fleet.component';
import { UpdateVehicleConfigurationComponent } from './vehicle-configuration/update-vehicle-configuration/update-vehicle-configuration.component';
import { AddVehicleConfigurationComponent } from './vehicle-configuration/add-vehicle-configuration/add-vehicle-configuration.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { UpdateCompanyConfigurationComponent } from './company-configuration/update-company-configuration/update-company-configuration.component';
import { AddCompanyConfigurationComponent } from './company-configuration/add-company-configuration/add-company-configuration.component';
import { CompanyConfigurationComponent } from './company-configuration/company-configuration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'api/homePage', pathMatch: 'full' },
  { path: 'api/company', component: CompanyConfigurationComponent },
  { path: 'api/company/add', component: AddCompanyConfigurationComponent },
  {
    path: 'api/company/update/:id',
    component: UpdateCompanyConfigurationComponent,
  },
  {
    path: 'api/vehicle-configuration',
    component: VehicleConfigurationComponent,
  },
  {
    path: 'api/vehicle-configuration/add',
    component: AddVehicleConfigurationComponent,
  },
  {
    path: 'api/vehicle-configuration/update/:id',
    component: UpdateVehicleConfigurationComponent,
  },
  { path: 'api/vehicle-fleet', component: VehicleFleetComponent },
  { path: 'api/vehicle-fleet/add', component: AddVehicleFleetComponent },
  { path: 'api/vehicle-fleet/update/:id', component: UpdateVehicleFleetComponent },
  { path: 'api/vehicle-services', component: VehicleServiceComponent },
  { path: 'api/vehicle-services/add', component: AddVehicleServiceComponent },
  {
    path: 'api/vehicle-services/update/:id',
    component: UpdateVehicleServiceComponent,
  },
  { path: 'api/homePage', component: HomeConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
