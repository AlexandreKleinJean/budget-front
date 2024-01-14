import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AuthGuard } from './app/auth.guard';
import { provideRouter, Routes } from '@angular/router';
import { withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>  import('./app/home/home.component').then(module => module.HomeComponent)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./app/auth/auth.routes')
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./app/account/account.routes')
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./app/transaction/transaction.routes')
  },
  { path: '**',
    loadComponent: () =>  import('./app/page-not-found/page-not-found.component').then(module => module.PageNotFoundComponent)
  }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent),
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(BrowserModule, FormsModule, HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})),
    provideRouter(routes)
  ]
  .catch(err => console.error(err));
