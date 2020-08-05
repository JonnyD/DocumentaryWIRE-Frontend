import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {

  private user;
  private changeUsernameForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;
  private usernameExists;
  private existingUsername;
  private isExistingUsername;
  private isFetchingUsername;
  private loadingUsernameCheck = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];
      this.existingUsername = this.user.username;
      this.isExistingUsername = true;

      this.initChangeUsernameForm();
    });
  }
  
  initChangeUsernameForm() {
    let username = this.user.username;

    this.changeUsernameForm = new FormGroup({
      'username': new FormControl(username, [Validators.required])
    });

    let count = 0;
    
    this.changeUsernameForm.valueChanges.subscribe(data => {
      this.loadingUsernameCheck = true;

      if (data.username != this.existingUsername) {
        this.userService.checkUsernameExists(data.username)
        .subscribe(result => {
          console.log("result");
          console.log(result);
          this.usernameExists = true;
          this.isExistingUsername = false;
          this.loadingUsernameCheck = false;
        }, 
        error => {
          console.log("error");
          console.log(error);
          this.usernameExists = false;
          this.isExistingUsername = false;
          this.loadingUsernameCheck = false;
        });
      } else {
        this.isExistingUsername = true;
        this.loadingUsernameCheck = false;
      }
    })
  }
  
  onChangeUsernameSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.changeUsernameForm.value;
    this.user.username = values.username;
    console.log("this.user");
    console.log(this.user);

    this.userService.updateUser(this.user)
      .subscribe(result => {
        console.log(result);
        this.existingUsername = this.user.username;
        this.flashMessages = [
          {
            'message': "Success",
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

  get fChangeUsername() { return this.changeUsernameForm.controls; }

}
