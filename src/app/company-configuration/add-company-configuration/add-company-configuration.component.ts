import { CompanyConfiguration } from './../../models/company-configuration.model';
import { CompanyConfigurationServiceService } from './../../services/company-configuration-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parseHostBindings } from '@angular/compiler';

@Component({
  selector: 'app-add-company-configuration',
  templateUrl: './add-company-configuration.component.html',
  styleUrls: ['./add-company-configuration.component.css'],
})
export class AddCompanyConfigurationComponent implements OnInit {

  companyConfig: CompanyConfiguration = new CompanyConfiguration();
  emailPattern = '[a-zA-Z]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}';
  addressPattern = '[a-zA-Z]+,[a-zA-Z]+,[0-9]+';
  addCompanyForm = this.fb.group({
    email: ['', Validators.pattern(this.emailPattern)],
    address: ['', Validators.pattern(this.addressPattern)],
  });
  componayForm!: FormGroup;
  url: any;

  constructor(
    private companyConfigurationService: CompanyConfigurationServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormCompanyForm();
  }

  get email() {
    return this.addCompanyForm.get('email');
  }
  get address() {
    return this.addCompanyForm.get('address');
  }

  saveCompany() {
    console.log(this.companyConfig);

    this.companyConfigurationService.create(this.companyConfig).subscribe(
      (data) => {
        console.log(data);
        this.goToCompanyList();
        this.openSnackBar();
      },
      (error) => this.errorSnackBar()
    );
  }

  goToCompanyList() {
    this.router.navigate(['/api/company']);
  }

  onSubmit() {
    this.saveCompany();
  }

  openSnackBar() {
    this.snackBar.open('Company Added', 'Dismiss', { duration: 5000 });
  }

  errorSnackBar() {
    this.snackBar.open(
      'Error, Please be sure to fill the fields as required',
      'Dismiss',
      { duration: 7000 }
    );
  }

  initFormCompanyForm() {
    this.componayForm = new FormGroup({
      companyName: this.fb.control(''),
      companyLogo: this.fb.control(''),
      address: this.fb.control(''),
      email: this.fb.control(''),
      description: this.fb.control(''),
    });
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
}
