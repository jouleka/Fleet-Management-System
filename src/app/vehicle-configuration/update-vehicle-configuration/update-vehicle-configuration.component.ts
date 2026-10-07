import { VehicleConfigurationServiceService } from './../../services/vehicle-configuration-service.service';
import { VehicleConfiguration } from './../../models/vehicle-configuration.model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyConfiguration } from 'src/app/models/company-configuration.model';
import { VehicleService } from 'src/app/models/vehicle-service.model';
import { CompanyConfigurationServiceService } from 'src/app/services/company-configuration-service.service';
import { VehicleServiceServicesService } from 'src/app/services/vehicle-service-services.service';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-update-vehicle-configuration',
    templateUrl: './update-vehicle-configuration.component.html',
    styleUrls: ['./update-vehicle-configuration.component.css'],
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
export class UpdateVehicleConfigurationComponent implements OnInit {
  id!: string;
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
    private vehicleServiceServicesService: VehicleServiceServicesService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getService();
    this.getVehicles();

    this.id = this.activateRouter.snapshot.params['id'];

    this.vehicleConfigurationService.getVehicleConfigById(this.id).subscribe(
      (data) => {
        this.vehicleConfig = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  goToServiceList() {
    this.router.navigate(['/api/vehicle-configuration']);
  }

  onSubmit() {
    this.vehicleConfigurationService
      .updateVehicleConfig(this.id, this.vehicleConfig)
      .subscribe(
        (data) => {
          this.goToServiceList();
          this.openSnackBar();
        },
        (error) => this.errorSnackBar()
      );
  }

  openSnackBar() {
    this.snackBar.open('Vehicle Configuration has been updated', 'Dismiss', {
      duration: 5000,
    });
  }

  errorSnackBar() {
    this.snackBar.open('Something went wrong please try again!', 'Dismiss', {
      duration: 7000,
    });
  }

  getCompanies() {
    this.companyService.getAll().subscribe((data) => {
      console.log(data);
      this.companyList = data;
    });
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

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
