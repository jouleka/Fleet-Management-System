import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyConfigurationComponent } from './company-configuration/company-configuration.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleServiceComponent } from './vehicle-service/vehicle-service.component';
import { VehicleFleetComponent } from './vehicle-fleet/vehicle-fleet.component';
import { AddCompanyConfigurationComponent } from './company-configuration/add-company-configuration/add-company-configuration.component';
import { UpdateCompanyConfigurationComponent } from './company-configuration/update-company-configuration/update-company-configuration.component';
import { AddVehicleConfigurationComponent } from './vehicle-configuration/add-vehicle-configuration/add-vehicle-configuration.component';
import { UpdateVehicleConfigurationComponent } from './vehicle-configuration/update-vehicle-configuration/update-vehicle-configuration.component';
import { AddVehicleFleetComponent } from './vehicle-fleet/add-vehicle-fleet/add-vehicle-fleet.component';
import { UpdateVehicleFleetComponent } from './vehicle-fleet/update-vehicle-fleet/update-vehicle-fleet.component';
import { AddVehicleServiceComponent } from './vehicle-service/add-vehicle-service/add-vehicle-service.component';
import { UpdateVehicleServiceComponent } from './vehicle-service/update-vehicle-service/update-vehicle-service.component';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FilterPipe } from './filter.pipe';
import { MatTableFilter, MatTableFilterModule } from 'mat-table-filter';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    CompanyConfigurationComponent,
    VehicleConfigurationComponent,
    VehicleServiceComponent,
    VehicleFleetComponent,
    AddCompanyConfigurationComponent,
    UpdateCompanyConfigurationComponent,
    AddVehicleConfigurationComponent,
    UpdateVehicleConfigurationComponent,
    AddVehicleFleetComponent,
    UpdateVehicleFleetComponent,
    AddVehicleServiceComponent,
    UpdateVehicleServiceComponent,
    HomeConfigurationComponent,
    SidebarComponent,
    DialogComponent,
    FilterPipe
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableFilterModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
