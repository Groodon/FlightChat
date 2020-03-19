import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Flight} from '../_interfaces/flight';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) { }

  getAllFlights() {
    return this.http.get<Flight>(`http://localhost:3000/flight/all`);
  }
}
