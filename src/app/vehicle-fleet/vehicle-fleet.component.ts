import { MatTableFilter } from 'mat-table-filter';
import { MatPaginator } from '@angular/material/paginator';
import { VehicleFleetServiceService } from './../services/vehicle-fleet-service.service';
import { VehicleFLeet } from './../models/vehicle-fleet.model';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicle-fleet',
  templateUrl: './vehicle-fleet.component.html',
  styleUrls: ['./vehicle-fleet.component.css'],
})
export class VehicleFleetComponent implements OnInit {
  displayedColumns: string[] = ['name', 'company', 'update', 'delete'];
  fleetConfig!: VehicleFLeet[];
  searchName!: string;
  fleets!: VehicleFLeet;
  dataSource!: MatTableDataSource<any>;

  constructor(
    private vehicleFleetService: VehicleFleetServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.vehicleFleetService.getAll().subscribe((data) => {
      // this.fleetConfig = data;
      console.log(data);
      data.map((x:any) => x.company = x.company.companyName);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteVehicleFleet(id: string) {
    this.vehicleFleetService.delete(id).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        this.snackBar.open('Vehicle Fleet was deleted', 'Dismiss', {
          duration: 5000,
        });
        this.getAll();
      }
    );
  }

  addBtnClick() {
    this.router.navigateByUrl('api/vehicle-fleet/add');
  }

  updateVehicleFleet(id: string) {
    this.router.navigate(['api/vehicle-fleet/update/' + id]);
  }

  openDialog(id: string) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (`${result}` == 'true') {
        this.deleteVehicleFleet(id);
      }
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
