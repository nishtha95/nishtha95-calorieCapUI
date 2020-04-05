import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportRequest } from '../models/ReportRequest';
import { UserService } from '../service/user.service';
import { DatePipe} from '@angular/common';
import { Meal } from '../models/Meal';
import { Location } from '@angular/common';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import { MatFormField} from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerToggle} from '@angular/material/datepicker';
import { User } from '../models/User';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  
  form:FormGroup;
  dateForm: FormGroup;
  currentDate=new Date();
  reportRequest: ReportRequest;
  items: any;
  meal: Meal;
  to=new Date();
  from=new Date().setMonth(this.currentDate.getMonth()-1);
  submitted=false;
  enterExpected=false;
  picker1: Date;
  picker2: Date;
  user:  User;
  constructor(private router: Router,private userService: UserService,private datePipe:DatePipe, private location: Location,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
    this.form=this.formBuilder.group({
      expectedCalorieCount: ['', Validators.required],
    });
    this.reportRequest={
      from:this.datePipe.transform(this.from,"yyyy-MM-dd"),
      to:this.datePipe.transform(this.to,"yyyy-MM-dd"),
      username:localStorage.getItem('username')
    }
    this.getReport();

  }
  get f() { return this.dateForm.controls; }
  getReport(){
    
    console.log(this.reportRequest.from);
    this.userService.getCaloriesReport(this.reportRequest)
    .subscribe(
      data => {
          this.items=data;
      },
      error => {
        console.log(error);
          alert(error.error.text);
      });
  }
  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.dateForm.invalid) {
        return;
    }
    this.reportRequest={
      from:this.dateForm.value.from,
      to:this.dateForm.value.to,
      username:localStorage.getItem('username')
    }
    console.log(this.from);
    this.getReport();
  }
  addMeal(){
    this.router.navigate(["/addMeal"]);
  }
  updateMeal(meal){
    this.userService.changeMeal(meal);
    this.router.navigate(["/addMeal"]);
  }
  deleteMeal(meal: any){
    this.userService.deleteMeal(meal)
    .subscribe(
      data => {
        this.router.navigateByUrl("/",{skipLocationChange:true}).then(()=>{
          this.router.navigate([decodeURI(this.location.path())]);
        });
          
          
      },
      error => {
        console.log(error);
          alert(error.error.text);
      });

  }
  editSetting(){
    this.enterExpected=true;
  }
  onSettingChange(){
    
    this.user={
      id:undefined,
      password:undefined,
      email:undefined,
      token:undefined,
      firstName:undefined,
      lastName:undefined,
      username:localStorage.getItem('username'),
      expectedCalorieCount:this.form.value.expectedCalorieCount
    };
    console.log(this.form.value.expectedCalorieCount);
    this.userService.editSuggestedCalorieCount(this.user)
    .subscribe(
      data => {
          this.enterExpected=false;
          this.router.navigateByUrl("/",{skipLocationChange:true}).then(()=>{
            this.router.navigate([decodeURI(this.location.path())]);
          });
      },
      error => {
        console.log(error);
          alert(error.error.text);
      });
  }
  
}
