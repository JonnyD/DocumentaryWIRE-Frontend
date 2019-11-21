import { UserService } from './../../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private username;
  private resetKey;
  private resetPasswordForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;
  private queryParamsSubscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.username = params['username'];
        this.resetKey = params['reset_key'];

        this.initResetPasswordForm();
      });;
  }
  
  initResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl("", [Validators.required])
    });
  }
  
  onResetPasswordSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.resetPasswordForm.value;

    this.userService.resetPassword(this.username, this.resetKey, values.password)
      .subscribe(result => {
        console.log(result);
        this.flashMessages = [
          {
            'message': result,
            "class": "success"
          }
        ];
      },
      error => {
        console.log(error);
        this.flashMessages = [
          {
            'message': error,
            "class": "danger"
          }
        ];
      }
      );
  }

  get fResetPassword() { return this.resetPasswordForm.controls; }

  onNgDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
