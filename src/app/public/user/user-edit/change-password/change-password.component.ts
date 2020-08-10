import { UserService } from './../../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  private user;
  private changePasswordForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];
      console.log(this.user);

      this.initChangeNameForm();
    });
  }

  initChangeNameForm() {
    let currentPassword = null;
    let newPassword = null;
    let confirmPassword = null;

    this.changePasswordForm = new FormGroup({
      'currentPassword': new FormControl(currentPassword, [Validators.required]),
      'newPassword': new FormControl(newPassword, [Validators.required]),
      'confirmPassword': new FormControl(confirmPassword, [Validators.required])
    });
  }

  onChangePasswordSubmit() {
    this.submitted = true;
    this.errors = null;
    this.flashMessages = null;

    let values = this.changePasswordForm.value;

    let isValid = this.changePasswordForm.valid;

    if (isValid) {
      let userId = this.user.id;
      this.userService.changePassword(userId, values)
        .subscribe(result => {
          console.log(result);
          this.flashMessages = [
            {
              'message': "Successfully updated your password",
              "class": "success"
            }
          ];
        },
          error => {
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
  }

  get fChangePassword() { return this.changePasswordForm.controls; }
}
