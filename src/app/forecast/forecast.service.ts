import { Injectable } from '@angular/core';
import { Forecast } from './forecast';

@Injectable()
export class ForecastService {
  private apiUrl = 'http://localhost:8080';
  selectedAccountId: number | null = null;
  jwtToken: string | null = null;

  constructor() {}

}

