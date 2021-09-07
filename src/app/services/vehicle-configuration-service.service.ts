import { VehicleConfiguration } from './../models/vehicle-configuration.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/vehicle-configuration';

@Injectable({
  providedIn: 'root'
})
export class VehicleConfigurationServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<VehicleConfiguration[]> {
    return this.http.get<VehicleConfiguration[]>(baseUrl + '/list');
  }

  getVehicleConfigById(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/list/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/add', data , { responseType: 'text' });
  }

  updateVehicleConfig(id: String, vehicle: VehicleConfiguration): Observable<Object> {
    return this.http.put(`${baseUrl}/update/${id}`, vehicle);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}
