import { MatSort } from '@angular/material/sort';
import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyConfigurationServiceService } from './../services/company-configuration-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyConfiguration } from '../models/company-configuration.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-company-configuration',
  templateUrl: './company-configuration.component.html',
  styleUrls: ['./company-configuration.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CompanyConfigurationComponent implements OnInit {
  displayedColumns: string[] = [
    'companyName',
    'address',
    'description',
    'update',
    'delete',
  ];
  companyConfig!: CompanyConfiguration[];
  companys!: CompanyConfiguration;
  dataSource!: MatTableDataSource<any>;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(
    private companyConfigurationService: CompanyConfigurationServiceService,
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
    this.companyConfigurationService.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCompany(id: string) {
    this.companyConfigurationService.delete(id).subscribe(
      (data) => {
        this.getAll();
        // this.snackBar.open('Company was deleted', 'Dismiss', {duration: 5000});
      },
      (error) => {
        this.getAll();
        // this.errorSnackBar();
      }
    );
  }

  addBtnClick() {
    this.router.navigateByUrl('api/company/add');
  }

  openDialog(id: string) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (`${result}` == 'true') {
        this.deleteCompany(id);
      }
    });
  }

  updateCompany(id: string) {
    this.router.navigate(['api/company/update/' + id]);
  }

  errorSnackBar() {
    this.snackBar.open(
      'Company is linked with a vehicle. Please be sure to delete the vehicle first and then delete the company',
      'Dismiss',
      { duration: 10000 }
    );
  }
}
