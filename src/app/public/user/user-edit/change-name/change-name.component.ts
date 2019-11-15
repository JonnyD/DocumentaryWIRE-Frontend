import { UserService } from './../../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {

  private user;
  private changeNameForm: FormGroup;
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
    let name = this.user.name;

    this.changeNameForm = new FormGroup({
      'name': new FormControl(name, [Validators.required])
    });
  }
  
  onChangeNameSubmit() {
    this.submitted = true;
    this.errors = null;

    let values = this.changeNameForm.value;

    this.user.name = values.name;
    
    this.userService.updateUser(this.user)
      .subscribe(result => {
        console.log(result);
        this.flashMessages = [
          {
            'message': "Success",
            "class": "success"
          }
        ];
        //this.router.navigate(["/user/edit"]);
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

  get fChangeName() { return this.changeNameForm.controls; }
}
