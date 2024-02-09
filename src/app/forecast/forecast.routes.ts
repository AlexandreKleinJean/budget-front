import { Routes } from '@angular/router';
import { ForecastService } from './forecast.service';

export default [{
  path: '',
  providers:[ForecastService],
  loadComponent: () =>  import('./forecast-setting/forecast-setting.component').then(module => module.ForecastSettingComponent)
}] as Routes;
