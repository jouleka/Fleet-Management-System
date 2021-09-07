import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/models/vehicle-service.model';
import { VehicleServiceServicesService } from 'src/app/services/vehicle-service-services.service';

@Component({
  selector: 'app-update-vehicle-service',
  templateUrl: './update-vehicle-service.component.html',
  styleUrls: ['./update-vehicle-service.component.css']
})
export class UpdateVehicleServiceComponent implements OnInit {

  id!: string;
  myForm!: FormGroup;
  serviceConfig: VehicleService = new VehicleService();

  constructor(
    private vehicleServiceConfiguration: VehicleServiceServicesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];

    this.vehicleServiceConfiguration.getVehicleServiceId(this.id).subscribe(data => {
      this.serviceConfig = data;
    }, error => console.log(error));
  }

  goToServiceList() {
    this.router.navigate(['api/vehicle-services']);
  }

  onSubmit() {
    this.vehicleServiceConfiguration.updateVehicleService(this.id, this.serviceConfig).subscribe(data => {
      this.goToServiceList();
      this.openSnackBar();
    }, error => this.errorSnackBar()
    );
  }

  openSnackBar() {
    this.snackBar.open('Service was updated successfully', 'Dismiss', {duration: 5000});
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
