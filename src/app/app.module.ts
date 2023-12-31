import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    TransactionModule,
    AppRoutingModule,
    RouterModule,
    CommonModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }import { HttpClientModule } from '@angular/common/http';

