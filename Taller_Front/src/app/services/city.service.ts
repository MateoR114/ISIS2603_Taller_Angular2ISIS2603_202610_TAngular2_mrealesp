import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }

  createCity(countryId: number, cityName: string): Observable<City> {
    return this.http.post<City>(
      `${this.apiUrl}/countries/${countryId}/cities`,
      { name: cityName }
    );
  }

  getWeatherRecords(cityId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cities/${cityId}/weather-records`);
  }

  saveWeatherRecord(cityId: number, data: { tempC: number; condition: string; humidity: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/cities/${cityId}/weather-records`, data);
  }
}