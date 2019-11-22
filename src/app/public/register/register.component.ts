import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { 
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.initForm();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'recaptchaReactive': new FormControl(null, Validators.required)
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    let formValue = this.registerForm.value;
    console.log(formValue);
    this.userService.createUser(formValue).subscribe((result: any) => {
      console.log(result);
      this.router.navigate(['']);
    }),
    (error) => {
      console.log(error);
    }
  }
}
