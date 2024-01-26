import { Routes } from '@angular/router';
import { ForecastService } from './forecast.service';

export default [{
  path: '',
  loadComponent: () =>  import('./forecast-setting/forecast-setting.component').then(module => module.ForecastSettingComponent),
  providers:[ForecastService]
}] as Routes;
