import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-user-add',
  templateUrl: './admin-user-add.component.html',
  styleUrls: ['./admin-user-add.component.css']
})
export class AdminUserAddComponent implements OnInit {

  private addUserForm: FormGroup;
  private userModel: User;
  private submitted = false;
  private errors;
  private avatarImgUrl: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.userModel = new User();

    this.initForm();
  }

  initForm() {
    let username = this.userModel.username;
    let password = this.userModel.password;
    let name = this.userModel.name;
    let email = this.userModel.email;
    let avatar = this.userModel.avatar;
    let activatedAt = this.userModel.activatedAt;
    let enabled = this.userModel.enabled;

    this.addUserForm = new FormGroup({
      'username': new FormControl(username, [Validators.required]),
      'password': new FormControl(password, [Validators.required]),
      'name': new FormControl(name, [Validators.required]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'avatar': new FormControl(avatar, [Validators.required])
    })
  }

  onAvatarChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addUserForm.patchValue({
          avatar: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

        this.avatarImgUrl = reader.result;
      };
    }
  }

  onSubmit() {
    this.submitted = true;

    let formValue = this.addUserForm.value;

    console.log("formValue");
    console.log(formValue);

    if (this.addUserForm.valid) {
      this.userService.createUser(formValue)
        .subscribe((result: any) => {
          console.log("created result");
          console.log(result);
          this.router.navigate(["/admin/users", result.username]);
        }, error => {
          this.errors = error.error;
          console.log("error");
          console.log(error.error);
        })
    }
  }
}
