import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Flight} from '../_interfaces/flight';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) { }

  getAllFlights(): Observable<Array<Flight>> {
    return this.http.get<Array<Flight>>(`http://localhost:3000/flight/all`);
  }
}
