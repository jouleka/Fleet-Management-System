import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { VehicleFleetServiceService } from './services/vehicle-fleet-service.service';

describe('maintained Angular HTTP compatibility', () => {
  it('keeps the existing mutation endpoint, method and JSON payload', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const service = TestBed.inject(VehicleFleetServiceService);
    const http = TestBed.inject(HttpTestingController);
    const payload: any = { name: 'Fleet A', company: { id: 'company-1' } };
    let result: unknown;
    service.create(payload).subscribe(value => { result = value; });
    const request = http.expectOne('http://localhost:8080/api/vehicle-fleet/add');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);
    request.flush({ saved: true });
    expect(result).toEqual({ saved: true });
    http.verify();
  });
});
