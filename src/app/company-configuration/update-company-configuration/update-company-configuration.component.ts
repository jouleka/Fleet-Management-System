import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyConfiguration } from 'src/app/models/company-configuration.model';
import { CompanyConfigurationServiceService } from 'src/app/services/company-configuration-service.service';

@Component({
  selector: 'app-update-company-configuration',
  templateUrl: './update-company-configuration.component.html',
  styleUrls: ['./update-company-configuration.component.css']
})
export class UpdateCompanyConfigurationComponent implements OnInit {

  id!: string;
  companyConfig: CompanyConfiguration = new CompanyConfiguration();
  componayForm!: FormGroup;
  url: any;

  constructor(
    private companyConfigurationService: CompanyConfigurationServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];

    this.companyConfigurationService.getCompanyById(this.id).subscribe(data => {
      this.companyConfig = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.companyConfigurationService.updateCompany(this.id, this.companyConfig).subscribe(data => {
      this.goToCompanyList();
      this.openSnackBar();
    }, error => this.errorSnackBar()
    );
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
    this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
    }
   }

   onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
    const reader = new FileReader();

    reader.onload = (e: any) => {
    this.companyConfig.companyLogo = e.target.result;
    };

    reader.readAsText(inputNode.files[0]);
    }
   }

  // edit(data?: any) {
  //   let comp = {
  //     companyName: 'test1',
  //     companyLogo: 'test2',
  //   };

  //   this.componayForm.patchValue({
  //     companyName: data.companyName,
  //     companyLogo: data.companyLogo,
  //   });
  // }

  goToCompanyList() {
    this.router.navigate(['/api/company']);
  }

  openSnackBar() {
      this.snackBar.open('Company Updated', 'Dismiss', {duration: 5000});
  }

  errorSnackBar() {
    this.snackBar.open(
      'Error, Please be sure to fill the fields as required',
      'Dismiss',
      { duration: 7000 }
    );
  }

}
