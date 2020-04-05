import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { AdminComponent } from './admin/admin.component';
import { ReportAdminComponent } from './report-admin/report-admin.component';
const routes: Routes = [
  { path:'',component: LoginComponent},
  { path:'register',component: RegisterComponent},
  { path:'report',component: ReportComponent},
  { path:'addMeal',component: AddMealComponent},
  { path:'admin',component: AdminComponent},
  { path:'mealReport',component: ReportAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
