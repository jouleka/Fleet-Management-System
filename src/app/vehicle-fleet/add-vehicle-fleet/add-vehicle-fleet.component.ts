import { VehicleConfigurationServiceService } from './../../services/vehicle-configuration-service.service';
import { VehicleFleetServiceService } from './../../services/vehicle-fleet-service.service';
import { VehicleFLeet } from './../../models/vehicle-fleet.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyConfiguration } from 'src/app/models/company-configuration.model';
import { VehicleConfiguration } from 'src/app/models/vehicle-configuration.model';
import { CompanyConfigurationServiceService } from 'src/app/services/company-configuration-service.service';

@Component({
  selector: 'app-add-vehicle-fleet',
  templateUrl: './add-vehicle-fleet.component.html',
  styleUrls: ['./add-vehicle-fleet.component.css'],
})
export class AddVehicleFleetComponent implements OnInit {
  myForm!: FormGroup;
  fleetConfig: VehicleFLeet = new VehicleFLeet();
  fleetService?: VehicleFLeet[];
  companyList?: CompanyConfiguration[];
  vehicleList!: VehicleConfiguration[];
  vsList?: VehicleConfiguration[] = [];

  constructor(
    private vehicleFleetService: VehicleFleetServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private companyService: CompanyConfigurationServiceService,
    private vehicleConfigurationService: VehicleConfigurationServiceService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getVehicles();
  }

  saveFleet() {
    console.log(this.fleetConfig);

    this.vehicleFleetService.create(this.fleetConfig).subscribe(
      (data) => {
        console.log(data);
        // this.myForm.reset();
        this.goToFleet();
        this.openSnackBar();
      },
      (error) => this.errorSnackBar()
    );
  }

  filteredVehicles(event: any) {
    console.log("filter event", event);

    this.vsList = Object.assign([],this.vehicleList);
    this.vsList = this.vsList.filter(
      (companyVehicles) =>
        event.source.value.companyName == companyVehicles.company?.companyName
    );
  }

  goToFleet() {
    this.router.navigate(['/api/vehicle-fleet']);
  }

  onSubmit() {
    console.log(this.fleetConfig);
    this.saveFleet();
  }

  openSnackBar() {
    this.snackBar.open('Vehicle Fleet has been added', 'Dismiss', {
      duration: 5000,
    });
  }

  errorSnackBar() {
    this.snackBar.open(
      'Error, Please be sure to fill the fields as required',
      'Dismiss',
      { duration: 7000 }
    );
  }

  getCompanies() {
    this.companyService.getAll().subscribe((data) => {
      console.log(data);
      this.companyList = data;
    });
  }
  getVehicles() {
    this.vehicleConfigurationService.getAll().subscribe((data) => {
      this.vehicleList = data;
    });
  }
}
