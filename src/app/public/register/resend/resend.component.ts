import { UserService } from './../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {

  private loading = false;

  private routeParamsSubscription;
  private resendSubscription;

  private email;

  private flashMessages;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    console.log("Here");
    this.loading = true;
    
    this.routeParamsSubscription = this.route.paramMap
      .subscribe(params => {
          this.email = params['params']['email'];

          this.resendSubscription = this.userService
            .resend(this.email)
            .subscribe(result => {
              console.log("result");
              console.log(result);
              this.flashMessages = [
                {
                  'message': result,
                  "class": "success"
                }
            ];

            this.loading = false;
          },
          error => {
            console.log(error);
            this.flashMessages = [
              {
                'message': error.error,
                "class": "danger"
              }
            ];

            this.loading = false;
          }
          );
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.resendSubscription.unsubscribe();
  }

}
