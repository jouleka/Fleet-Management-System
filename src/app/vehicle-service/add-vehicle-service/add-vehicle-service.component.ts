import { VehicleServiceServicesService } from './../../services/vehicle-service-services.service';
import { VehicleService } from './../../models/vehicle-service.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-vehicle-service',
  templateUrl: './add-vehicle-service.component.html',
  styleUrls: ['./add-vehicle-service.component.css'],
})
export class AddVehicleServiceComponent implements OnInit {
  myForm!: FormGroup;
  serviceConfig: VehicleService = new VehicleService();

  constructor(
    private vehicleServiceConfiguration: VehicleServiceServicesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  saveService(data: any) {
    this.vehicleServiceConfiguration.create(data).subscribe(
      (data) => {
        this.goToServiceList();
        this.openSnackBar();
      },
      (error) => this.errorSnackBar()
    );
  }

  goToServiceList() {
    console.log('NAVIGATE BACK');

    this.router.navigate(['api/vehicle-services']);
  }

  onSubmit() {
    console.log(this.serviceConfig);
    this.saveService(this.serviceConfig);
  }

  openSnackBar() {
    this.snackBar.open('Service was added successfully', 'Dismiss', {duration: 5000});
  }

  errorSnackBar() {
    this.snackBar.open('Error, Please be sure to complete the fields as required', 'Dismiss', {duration: 7000});
  }

  checkValue(event: any) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }
  }
}
