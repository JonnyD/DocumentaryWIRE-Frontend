import { UserService } from './../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  private loading = false;

  private queryParamsSubscription;
  private confirmSubscription;

  private username;
  private confirmationToken;

  private flashMessages;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    console.log("Here");
    this.loading = true;

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
          this.username = params['username'];
          this.confirmationToken = params['confirmation_token'];
          console.log("this.username");
          console.log(this.username);
          console.log("this.confirmationtoken");
          console.log(this.confirmationToken);

          this.confirmSubscription = this.userService.confirm(this.username, this.confirmationToken)
          .subscribe(result => {
            console.log("result");
            console.log(result);
            let message = "";
            if (result.activated_at != null) {
              message = "Confirmation Succssful";
            }
            this.flashMessages = [
              {
                'message': message,
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
    });
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.confirmSubscription.unsubscribe();
  }
}
