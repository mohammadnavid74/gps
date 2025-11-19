import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    // var url = 'https://mocki.io/v1/eb352d11-617c-4b5e-bfa5-b060d4353452';
    // var url = 'http://192.168.90.2:5700/api/Roadside/Location/GetLocation';
    var url = 'http://45.149.77.7:6633/api/Roadside/Location/GetLocation';

    return this.http.get<any[]>(url);
  }
}
