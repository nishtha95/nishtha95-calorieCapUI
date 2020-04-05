import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service'
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms';
import {Router } from '@angular/router';
import { Meal } from '../models/Meal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})

export class AddMealComponent implements OnInit {
  mealForm: FormGroup;
  loading = false;
  submitted = false;
  date: Date;
  meal:Meal;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private datePipe: DatePipe
) { 
    
}

ngOnInit() {
  this.userService.meal.subscribe(meal => this.meal = meal);
  this.mealForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      calorieCount: ['',Validators.required],
  });
  if(this.meal==null || this.meal==undefined){
    this.meal=new Meal();
    this.userService.changeMeal(this.meal);
  }
}

get f() { return this.mealForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.mealForm.invalid) {
      return;
  }

  this.loading = true;
  console.log(this.mealForm.value);
  this.meal.username=localStorage.getItem('username');
  this.meal.calorieCount=this.mealForm.value.calorieCount;
  this.meal.description=this.mealForm.value.description;
  this.meal.date=this.mealForm.value.date;
            
  console.log(this.meal);
  this.userService.addMeal(this.meal)
      .subscribe(
          data => {
            this.loading=false;
              alert('Meal Added Succesfully');
              this.meal=new Meal();
              this.userService.changeMeal(this.meal);
          },
          error => {
            console.log(error);
              alert(error.error.text);
              this.loading = false;
          });
}
return(){
  this.router.navigate(["/report"]);
}
}
