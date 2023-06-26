import {HttpClient} from "@angular/common/http"
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Reservation } from "./reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BACKEND_URL = "http://localhost:8000/api/v1/reservations";

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.BACKEND_URL);
  }
}
