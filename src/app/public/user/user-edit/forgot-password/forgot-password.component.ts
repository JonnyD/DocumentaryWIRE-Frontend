import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private forgotPasswordForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.initForgotPasswordForm();
  }
  
  initForgotPasswordForm() {
    let username = null;
    this.forgotPasswordForm = new FormGroup({
      'username': new FormControl(username, [Validators.required])
    });
  }
  
  onForgotPasswordSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.forgotPasswordForm.value;
    let username = values.username;
    console.log("username");
    console.log(username);

    this.userService.forgotPassword(username)
      .subscribe(result => {
        console.log("result");
        console.log(result);
        this.flashMessages = [
          {
            'message': result,
            "class": "success"
          }
        ];
      },
      error => {
        console.log("error");
        console.log(error);
        this.flashMessages = [
          {
            'message': error.error,
            "class": "danger"
          }
        ];
      }
      );
  }

  get fForgotPassword() { return this.forgotPasswordForm.controls; }

}
