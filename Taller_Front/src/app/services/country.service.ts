import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/countries`);
  }
}