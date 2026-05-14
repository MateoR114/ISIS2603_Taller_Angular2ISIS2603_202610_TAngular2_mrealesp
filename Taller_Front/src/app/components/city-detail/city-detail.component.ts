import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { City } from '../../models/city.model';
import { WeatherDetail } from '../../models/weather-detail.model';
import { WeatherService } from '../../services/weather.service';
import { CityService } from '../../services/city.service';


@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
})
export class CityDetailComponent implements OnChanges {
  @Input() city!: City;

  weatherDetail: WeatherDetail | null = null;
  loading: boolean = false;
  weatherRecords: any[] = [];

  constructor(
    private weatherService: WeatherService,
    private cityService: CityService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['city'] && this.city) {
      this.loadWeather();
      this.loadRecords();
    }
  }

  loadWeather(): void {
    this.loading = true;
    this.weatherDetail = null;
    this.weatherService.getWeather(this.city.name).subscribe({
      next: data => {
        this.weatherDetail = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadRecords(): void {
    this.cityService.getWeatherRecords(this.city.id).subscribe(
      data => this.weatherRecords = data
    );
  }

  saveCurrentWeather(): void {
    if (!this.weatherDetail) return;
    const payload = {
      tempC: this.weatherDetail.temp_c,
      condition: this.weatherDetail.condition,
      humidity: this.weatherDetail.humidity
    };
    this.cityService.saveWeatherRecord(this.city.id, payload).subscribe(() => {
      this.loadRecords();
    });
  }
}