import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
})
export class CityCreateComponent implements OnInit {
  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  countries: Country[] = [];
  cityName: string = '';
  selectedCountryId: number | null = null;

  constructor(
    private countryService: CountryService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => this.countries = data);
  }

  isFormValid(): boolean {
    return this.cityName.trim() !== '' && this.selectedCountryId !== null;
  }

  save(): void {
    if (!this.isFormValid()) return;
    this.cityService.createCity(this.selectedCountryId!, this.cityName).subscribe(() => {
      this.cityCreated.emit();
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}