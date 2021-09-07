import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyConfiguration } from '../models/company-configuration.model';

const baseUrl = 'http://localhost:8080/api/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyConfigurationServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list');
  }

  getCompanyById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/list/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/add', data, { responseType: 'text' });
  }

  updateCompany(id: String, company: CompanyConfiguration): Observable<Object> {
    return this.http.put(`${baseUrl}/update/${id}`, company);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}
