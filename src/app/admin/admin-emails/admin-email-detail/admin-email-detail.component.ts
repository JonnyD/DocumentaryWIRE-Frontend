import { EmailService } from './../../../services/email.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-admin-email-detail',
  templateUrl: './admin-email-detail.component.html',
  styleUrls: ['./admin-email-detail.component.css']
})
export class AdminEmailDetailComponent implements OnInit {
  private emailModel: Email;

  private routeParamsSubscription;
  private emailSubscription;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      let id = params['params']['id'];

      this.emailSubscription = this.emailService.getEmailById(id)
        .subscribe((result: any) => {
          this.emailModel = result;
        });

    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    if (this.emailSubscription != null) {
      this.emailSubscription.unsubscribe();
    }
  }
}
