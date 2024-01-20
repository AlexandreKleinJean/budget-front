import { Routes } from '@angular/router';

export default [{
  path: '',
    loadComponent: () =>  import('./forecast-setting.component').then(module => module.ForecastSettingComponent),
  providers:[]
}] as Routes;
