import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customers/list/customer-list.component';
import { Database } from './shared/database';
import { CustomerService } from './customers/customer.service';
import { CustomerDetailComponent } from './customers/detail/customer-detail.component';
import { CustomerShellComponent } from './customers/customer-shell.component';
import { FilterTextComponent } from './shared/filters/filter-text.component';
import { CustomerEditComponent } from './customers/edit/customer-edit.component';
import { CustomerEditGuardService } from './customers/edit/customer-edit-guard.service';
import { AppPageNotFoundComponent } from './app.page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AppPageNotFoundComponent,
    CustomerShellComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerEditComponent,
    FilterTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(Database),
  ],
  providers: [CustomerService, CustomerEditGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
