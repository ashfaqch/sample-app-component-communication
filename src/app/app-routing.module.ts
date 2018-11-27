import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerShellComponent } from './customers/customer-shell.component';
import { CustomerEditComponent } from './customers/edit/customer-edit.component';
import { CustomerEditGuardService } from './customers/edit/customer-edit-guard.service';
import { AppPageNotFoundComponent } from './app.page-not-found.component';

const routes: Routes = [
  { path: 'customers', component: CustomerShellComponent},
  { path: 'customers/:id/edit', component: CustomerEditComponent, canDeactivate: [ CustomerEditGuardService ] },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: '**', component: AppPageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
