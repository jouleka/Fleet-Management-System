import { VehicleServiceServicesService } from './../services/vehicle-service-services.service';
import { VehicleService } from './../models/vehicle-service.model';
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
    selector: 'app-vehicle-service',
    templateUrl: './vehicle-service.component.html',
    styleUrls: ['./vehicle-service.component.css'],
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
export class VehicleServiceComponent implements OnInit {
  displayedColumns: string[] = [
    'serviceName',
    'timeFrequency',
    'kilometerFrequency',
    'update',
    'delete',
  ];
  vehicleConfig!: VehicleService[];
  vehicle!: VehicleService;
  dataSource!: MatTableDataSource<any>;

  constructor(
    private vehicleServiceConfiguration: VehicleServiceServicesService,
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
    this.vehicleServiceConfiguration.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCompany(id: any) {
    this.vehicleServiceConfiguration.delete(id).subscribe(
      () => {
        this.getAll();
        this.snackBar.open('Vehicle Service was deleted', 'Dismiss', {duration: 5000});
      },
      (error) => {
        this.getAll();
      }
    );
  }

  openDialog(id: string) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (`${result}` == 'true') {
        this.deleteCompany(id);
      }
    });
  }

  addBtnClick() {
    this.router.navigateByUrl('api/vehicle-services/add');
  }

  editBtnClick(id: string) {
    this.router.navigate(['api/vehicle-services/update/'+id]);
  }

  // deleteBtnClick() {
  //   this.router.navigateByUrl('api/vehicle-services/delete')
  // }
}
