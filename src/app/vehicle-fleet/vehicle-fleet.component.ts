import { MatPaginator } from '@angular/material/paginator';
import { VehicleFleetServiceService } from './../services/vehicle-fleet-service.service';
import { VehicleFLeet } from './../models/vehicle-fleet.model';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { AbstractControl, UntypedFormBuilder } from '@angular/forms';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-vehicle-fleet',
    templateUrl: './vehicle-fleet.component.html',
    styleUrls: ['./vehicle-fleet.component.css'],
    imports: [
        MatFormField,
        MatInput,
        MatButton,
        MatIcon,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatPaginator,
    ],
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
    public formBuilder: UntypedFormBuilder
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
