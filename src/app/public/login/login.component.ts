import { SEOService } from './../../services/seo.service';
import { Me } from './../../models/me.model';
import { UserService } from './../../services/user.service';
import { Location } from '@angular/common';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Token } from '../../models/token.model';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private seoService: SEOService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.isAuthenticated()) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.seoService.setPageTitle('Login | DocumentaryWIRE');
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(
          this.f.username.value, 
          this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.userService.getMe()
                        .subscribe((result: any) => {
                            if (!result.activatedAt) {
                                console.log("result");
                                console.log(result);
                                this.authenticationService.logout();
                                this.router.navigate(["/email-not-confirmed", result.email]);
                            } else {
                                window.location.replace(this.returnUrl);
                            }
                        });
                },
                error => {
                    this.error = error.error.error_description;
                    this.loading = false;
                    console.log(this.error);
                });
    }
}