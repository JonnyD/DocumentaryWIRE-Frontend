import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  private user;
  private changeEmailForm: FormGroup;
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

      this.initChangeEmailForm();
    });
  }

  initChangeEmailForm() {
    let email = this.user.email;
    console.log(email);

    this.changeEmailForm = new FormGroup({
      'email': new FormControl(email, [Validators.required, Validators.email])
    });
  }

  onChangeEmailSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.changeEmailForm.value;

    this.user.email = values.email;

    this.userService.changeEmail(this.user.id, this.user.email)
      .subscribe(result => {
        console.log(result);
        this.flashMessages = [
          {
            'message': "Success",
            "class": "success"
          }
        ];
      },
        error => {
          console.log("chang email error");
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

  get fChangeEmail() { return this.changeEmailForm.controls; }

}
