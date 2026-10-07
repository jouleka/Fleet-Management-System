import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'api/homePage', pathMatch: 'full' },
  { path: 'api/company', loadComponent: () => import('./company-configuration/company-configuration.component').then(module => module.CompanyConfigurationComponent) },
  { path: 'api/company/add', loadComponent: () => import('./company-configuration/add-company-configuration/add-company-configuration.component').then(module => module.AddCompanyConfigurationComponent) },
  {
    path: 'api/company/update/:id',
    loadComponent: () => import('./company-configuration/update-company-configuration/update-company-configuration.component').then(module => module.UpdateCompanyConfigurationComponent),
  },
  {
    path: 'api/vehicle-configuration',
    loadComponent: () => import('./vehicle-configuration/vehicle-configuration.component').then(module => module.VehicleConfigurationComponent),
  },
  {
    path: 'api/vehicle-configuration/add',
    loadComponent: () => import('./vehicle-configuration/add-vehicle-configuration/add-vehicle-configuration.component').then(module => module.AddVehicleConfigurationComponent),
  },
  {
    path: 'api/vehicle-configuration/update/:id',
    loadComponent: () => import('./vehicle-configuration/update-vehicle-configuration/update-vehicle-configuration.component').then(module => module.UpdateVehicleConfigurationComponent),
  },
  { path: 'api/vehicle-fleet', loadComponent: () => import('./vehicle-fleet/vehicle-fleet.component').then(module => module.VehicleFleetComponent) },
  { path: 'api/vehicle-fleet/add', loadComponent: () => import('./vehicle-fleet/add-vehicle-fleet/add-vehicle-fleet.component').then(module => module.AddVehicleFleetComponent) },
  { path: 'api/vehicle-fleet/update/:id', loadComponent: () => import('./vehicle-fleet/update-vehicle-fleet/update-vehicle-fleet.component').then(module => module.UpdateVehicleFleetComponent) },
  { path: 'api/vehicle-services', loadComponent: () => import('./vehicle-service/vehicle-service.component').then(module => module.VehicleServiceComponent) },
  { path: 'api/vehicle-services/add', loadComponent: () => import('./vehicle-service/add-vehicle-service/add-vehicle-service.component').then(module => module.AddVehicleServiceComponent) },
  {
    path: 'api/vehicle-services/update/:id',
    loadComponent: () => import('./vehicle-service/update-vehicle-service/update-vehicle-service.component').then(module => module.UpdateVehicleServiceComponent),
  },
  { path: 'api/homePage', loadComponent: () => import('./home-configuration/home-configuration.component').then(module => module.HomeConfigurationComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
