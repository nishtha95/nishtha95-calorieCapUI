import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service'
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import {Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
) { 
    // redirect to home if already logged in
    if (this.authenticationService.getCurrentUser) { 
        this.router.navigate(['/report']);
    }
}

ngOnInit() {
  this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      expectedCalorieCount: ['',Validators.required],
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }

  this.loading = true;
  console.log(this.registerForm.value);
  this.userService.register(this.registerForm.value)
      .subscribe(
          data => {
              alert('Registration successful');
              this.router.navigate(['/']);
          },
          error => {
            console.log(error);
              alert(error.error.text);
              this.loading = false;
          });
}
}
