import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportRequest } from '../models/ReportRequest';
import { UserService } from '../service/user.service';
import { DatePipe} from '@angular/common';
import { Meal } from '../models/Meal';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit {

  dateForm: FormGroup;
  reportRequest: ReportRequest;
  items: any;
  meal: Meal;
  submitted=false;
  enterExpected=false;
  picker1: Date;
  picker2: Date;
  user:  User;
  users: any;
  username:string;
  constructor(private router: Router,private userService: UserService,private datePipe:DatePipe, private location: Location,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.username="All";
    this.dateForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      username: ['', Validators.required]
    });
    this.userService.fetchUsers()
    .subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
        alert(error.error.text);
      });
  }
  get f() { return this.dateForm.controls; }
  changeUsername(value) {
    this.username = value.username;
  }
  onSubmit(){
    if (this.dateForm.invalid) {
      return;
    }
    this.reportRequest={
      from:this.dateForm.value.from,
      to:this.dateForm.value.to,
      username:this.username
    }
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
  return(){
    this.router.navigate(["/admin"]);
  }
}
