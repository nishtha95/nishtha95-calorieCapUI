import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
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
            if (localStorage.getItem('role') == 'User') {
                this.router.navigate(['/report']);
            }
            if (localStorage.getItem('role') == 'Admin') {
                this.router.navigate(['/admin']);
            }
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.loginForm.value);
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
                data => {
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('username', data.username);
                    console.log("This is uer data"+data);
                    alert('Login successful');
                    if (data.role == 'User') {
                        this.router.navigate(['/report']);
                    }
                    if (data.role == 'Admin') {
                        this.router.navigate(['/admin']);
                    }
                },
                error => {
                    alert("Username or Password is incorrect");

                    this.loading = false;
                });
    }
}