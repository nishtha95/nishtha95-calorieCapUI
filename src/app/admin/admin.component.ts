import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportRequest } from '../models/ReportRequest';
import { UserService } from '../service/user.service';
import { DatePipe } from '@angular/common';
import { Meal } from '../models/Meal';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dateForm: FormGroup;
  reportRequest: ReportRequest;
  users: any;
  allUsers:any;
  meal: Meal;
  submitted = false;
  enterExpected = false;
  picker1: Date;
  picker2: Date;
  user: User;
  show = false;
  showForm = false;
  username: string;

  constructor(private router: Router, private userService: UserService, private datePipe: DatePipe, private location: Location, private formBuilder: FormBuilder) { }

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
          this.allUsers= [ ...this.users ].map(item=>({...item}));
          this.allUsers.push({
            username:"All"
          });
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
  showUsers() {
    this.show = true;
  }
  deleteUser(user) {
    console.log(user);
    this.userService.deleteUser(user.username)
      .subscribe(
        data => {
          this.router.navigateByUrl("/register", { skipLocationChange: true }).then(() => {
            this.router.navigate(["/admin"]);
          });
        },
        error => {
          console.log(error);
          alert(error.error.text);
        });
    this.show = false;
  }
  showDateForm() {
    this.showForm = true;
  }
  showMeals() {
    this.router.navigate(['/mealReport']);
  }
  onSubmit() {
    if (this.dateForm.invalid) {
      return;
    }
    this.reportRequest = {
      from: this.dateForm.value.from,
      to: this.dateForm.value.to,
      username: this.username
    }
    console.log(this.username)
    this.userService.deleteMealsByUsername(this.reportRequest)
      .subscribe(
        data => {
          alert("Records Deleted Successfully")
        },
        error => {
          console.log(error);
          alert(error.error.text);
        });
  }
}
