import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleFLeet } from '../models/vehicle-fleet.model';

const baseUrl = 'http://localhost:8080/api/vehicle-fleet';

@Injectable({
  providedIn: 'root'
})
export class VehicleFleetServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl + '/list');
  }

  getVehicleFLeet(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/list/${id}`);
  }

  create(data: any): Observable<any> {

    return this.http.post(baseUrl + '/add', data);
  }

  updateVehicleFleet(id: String, fleet: VehicleFLeet): Observable<Object> {
    return this.http.put(`${baseUrl}/update/${id}`, fleet);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }
}
