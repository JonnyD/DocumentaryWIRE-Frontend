import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {

  private user;
  private changeAvatarForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;
  private avatarImgURL;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];
      console.log(this.user);

      this.initChangeAvatarForm();
    });
  }

  initChangeAvatarForm() {
    let avatar = this.user.avatar;
    this.avatarImgURL = avatar;

    this.changeAvatarForm = new FormGroup({
      'avatar': new FormControl(avatar, [Validators.required])
    });
  }

  get f() { return this.changeAvatarForm.controls; }

  onAvatarChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.changeAvatarForm.patchValue({
          avatar: reader.result
        });

        this.cd.markForCheck();

        this.avatarImgURL = reader.result;
      };
    }
  }

  onChangeAvatarSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.changeAvatarForm.value;

    this.user.avatar = values.avatar;

    this.userService.changeAvatar(this.user.id, this.user.avatar)
      .subscribe(result => {
        console.log(result);
        this.flashMessages = [
          {
            'message': "Success",
            "class": "success"
          }
        ];

        window.location.replace("/user/edit");
      },
        error => {
          console.log("change avatar error");
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

  removeAvatar() {
    console.log("remove")

    this.userService.removeAvatar(this.user.id)
      .subscribe(result => {
        console.log("remove result");
        console.log(result);
        this.flashMessages = [
          {
            'message': "Success",
            "class": "success"
          }
        ];

        this.avatarImgURL = result['avatar'];
        window.location.replace("/user/edit");
      },
        error => {
          console.log("change avatar error");
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
