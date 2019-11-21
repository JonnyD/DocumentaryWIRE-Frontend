import { UserService } from './../../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit {

  private username;
  private resetKey;
  private forgotUsernameForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.initForgotUsernameForm();
  }
  
  initForgotUsernameForm() {
    this.forgotUsernameForm = new FormGroup({
      'email': new FormControl("", [Validators.required])
    });
  }
  
  onForgotUsernameSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.forgotUsernameForm.value;

    this.userService.forgotUsername(values.email)
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

  get fForgotUsername() { return this.forgotUsernameForm.controls; }
}
