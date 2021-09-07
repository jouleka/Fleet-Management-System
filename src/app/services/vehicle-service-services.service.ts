import { VehicleService } from './../models/vehicle-service.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/vehicle-services';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceServicesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<VehicleService[]> {
    return this.http.get<VehicleService[]>(baseUrl + '/list');
  }

  getVehicleServiceId(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/list/${id}`);
  }

  create(data: any): Observable<any> {

    return this.http.post(baseUrl + '/add', data);
  }

  updateVehicleService(id: String, service: VehicleService): Observable<Object> {
    return this.http.put(`${baseUrl}/update/${id}`, service);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}
