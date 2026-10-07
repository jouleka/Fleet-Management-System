import { VehicleConfigurationServiceService } from './../services/vehicle-configuration-service.service';
import { VehicleConfiguration } from './../models/vehicle-configuration.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-vehicle-configuration',
    templateUrl: './vehicle-configuration.component.html',
    styleUrls: ['./vehicle-configuration.component.css'],
    imports: [
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
export class VehicleConfigurationComponent implements OnInit {
  displayedColumns: string[] = [
    'vehicleName',
    'company',
    'vehicleEngine',
    'update',
    'delete',
  ];
  vehicleConfig!: VehicleConfiguration[];
  vehicle!: VehicleConfiguration;
  dataSource!: MatTableDataSource<any>;

  constructor(
    private vehicleConfigurationService: VehicleConfigurationServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.vehicleConfigurationService.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCompany(id: any) {
    this.vehicleConfigurationService.delete(id).subscribe(
      () => {
        console.log(id);

        this.getAll();
        this.snackBar.open('Vehicle Configuration was deleted', 'Dismiss', {
          duration: 5000,
        });
      },
      (error) => {
        this.getAll();
        this.snackBar.open('There was an error please try again', 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  addBtnClick() {
    this.router.navigateByUrl('api/vehicle-configuration/add');
  }

  updateBtnClick(id: string) {
    this.router.navigate(['api/vehicle-configuration/update/' + id]);
  }

  openDialog(id: string) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (`${result}` == 'true') {
        this.deleteCompany(id);
      }
    });
  }
}
