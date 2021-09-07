import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyConfiguration } from 'src/app/models/company-configuration.model';
import { VehicleConfiguration } from 'src/app/models/vehicle-configuration.model';
import { VehicleFLeet } from 'src/app/models/vehicle-fleet.model';
import { CompanyConfigurationServiceService } from 'src/app/services/company-configuration-service.service';
import { VehicleConfigurationServiceService } from 'src/app/services/vehicle-configuration-service.service';
import { VehicleFleetServiceService } from 'src/app/services/vehicle-fleet-service.service';

@Component({
  selector: 'app-update-vehicle-fleet',
  templateUrl: './update-vehicle-fleet.component.html',
  styleUrls: ['./update-vehicle-fleet.component.css']
})
export class UpdateVehicleFleetComponent implements OnInit {
  id!: string;
  myForm!: FormGroup;
  fleetConfig: VehicleFLeet = new VehicleFLeet();
  fleetService!: VehicleFLeet[];
  companyList!: CompanyConfiguration[];
  vehicleList!: VehicleConfiguration[];
  vsList?: VehicleConfiguration[] = [];


  constructor(
    private vehicleFleetService: VehicleFleetServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private companyService: CompanyConfigurationServiceService,
    private vehicleConfigurationService: VehicleConfigurationServiceService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getVehicles();

    this.id = this.activateRouter.snapshot.params['id'];

    this.vehicleFleetService.getVehicleFLeet(this.id).subscribe(data => {
      this.fleetConfig = data;
    }, error => console.log(error)
    )
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
    this.vehicleFleetService.updateVehicleFleet(this.id, this.fleetConfig).subscribe(data => {

      this.goToFleet();
      this.openSnackBar();
    }, error => console.log(this.fleetConfig));
  }

  openSnackBar() {
    this.snackBar.open('Vehicle Fleet has been updated', 'Dismiss', {duration: 5000});
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
  getVehicles() {
    this.vehicleConfigurationService.getAll().subscribe((data) => {
      console.log(data);
      this.vehicleList = data;
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
