import { UserService } from '../../../../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-about-me',
  templateUrl: './change-about-me.component.html',
  styleUrls: ['./change-about-me.component.css']
})
export class ChangeAboutMeComponent implements OnInit {

  private user;
  private changeAboutMeForm: FormGroup;
  private submitted = false;
  private errors;
  private flashMessages;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.user = result[0];
      console.log(this.user);

      this.initChangeAboutMeForm();
    });
  }

  initChangeAboutMeForm() {
    let aboutMe = this.user.aboutMe;

    this.changeAboutMeForm = new FormGroup({
      'aboutMe': new FormControl(aboutMe, [Validators.required])
    });
  }

  onChangeAboutMeSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.changeAboutMeForm.value;

    this.user.aboutMe = values.aboutMe;

    this.userService.changeAboutMe(this.user.id, this.user.aboutMe)
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
          console.log("change about me error");
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

  get fChangeAboutMe() { return this.changeAboutMeForm.controls; }

}
