import { CompanyConfigurationServiceService } from 'src/app/services/company-configuration-service.service';
import { VehicleConfigurationServiceService } from './../../services/vehicle-configuration-service.service';
import { VehicleConfiguration } from './../../models/vehicle-configuration.model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyConfiguration } from 'src/app/models/company-configuration.model';
import { VehicleService } from 'src/app/models/vehicle-service.model';
import { VehicleServiceServicesService } from 'src/app/services/vehicle-service-services.service';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-add-vehicle-configuration',
    templateUrl: './add-vehicle-configuration.component.html',
    styleUrls: ['./add-vehicle-configuration.component.css'],
    imports: [
        MatButton,
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatSelect,
        NgFor,
        MatOption,
    ],
})
export class AddVehicleConfigurationComponent implements OnInit {
  myForm!: UntypedFormGroup;
  vehicleConfig: VehicleConfiguration = new VehicleConfiguration();
  services!: VehicleService[];
  companyList!: CompanyConfiguration[];
  vehicles!: VehicleConfiguration[];

  constructor(
    private vehicleConfigurationService: VehicleConfigurationServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private companyService: CompanyConfigurationServiceService,
    private vehicleServiceServicesService: VehicleServiceServicesService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getService();
    this.getVehicles();
  }

  saveService() {
    console.log(this.vehicleConfig);

    this.vehicleConfigurationService.create(this.vehicleConfig).subscribe(
      (data) => {
        console.log(data);
        // this.myForm.reset();
        this.goToServiceList();
        this.openSnackBar();
      },
      (error) => this.errorSnackBar()
    );
  }

  goToServiceList() {
    this.router.navigate(['/api/vehicle-configuration']);
  }

  onSubmit() {
    console.log(this.vehicleConfig);
    this.saveService();
  }

  openSnackBar() {
    this.snackBar.open('Vehicle Configurations has been added', 'Dismiss', {duration: 5000});
  }

  errorSnackBar() {
    this.snackBar.open('Error, Please be sure to fill the fields as required', 'Dismiss', {duration: 7000});
  }

  getCompanies() {
    this.companyService.getAll().subscribe((data) => {
      console.log(data);
      this.companyList = data;
    })
  }
  getService() {
    this.vehicleServiceServicesService.getAll().subscribe((data) => {
      console.log(data);

      this.services = data;
    });
  }
  getVehicles() {

    this.vehicleConfigurationService.getAll().subscribe((data) => {
      this.vehicles = data;
    });
  }

  checkValue(event: any) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }
}
