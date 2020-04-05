import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { LogoutComponent } from './logout/logout.component';
import { FormDirective } from './form.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '../app/auth.interceptor'
import {MatIconModule} from '@angular/material/icon';
import { AdminComponent } from './admin/admin.component';
import { ReportAdminComponent } from './report-admin/report-admin.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ReportComponent,
    AddMealComponent,
    LogoutComponent,
    FormDirective,
    AdminComponent,
    ReportAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
