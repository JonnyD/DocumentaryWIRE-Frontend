import { EmailService } from './../../../services/email.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/models/email.model';

@Component({
  selector: 'app-admin-email-add',
  templateUrl: './admin-email-add.component.html',
  styleUrls: ['./admin-email-add.component.css']
})
export class AdminEmailAddComponent implements OnInit {
  private editEmailForm: FormGroup;
  private emailModel: Email;

  private emailSubscription;
  private routeParamsSubscription;

  private editMode;

  private submitted;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.emailModel = new Email();

    this.initForm();

    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      let id = params['params']['id'];
      this.editMode = id != null;
      console.log("id");
      console.log(id);

      if (this.editMode) {
        this.emailSubscription = this.emailService.getEmailById(id)
          .subscribe((result: any) => {
            console.log("result");
            console.log(result);
            this.emailModel = result;
            this.initForm();
          });
      }

    });
  }

  initForm() {
    let email = this.emailModel.email;
    let subscribed = this.emailModel.subscribed;

    this.editEmailForm = new FormGroup({
      'email': new FormControl(email, [Validators.required]),
      'subscribed': new FormControl(subscribed, [Validators.required]),
    });
  }

  onSubmit() {
    this.submitted = true;

    let emailId = this.emailModel.id;
    let formValue = this.editEmailForm.value;
    let subscribed = String(formValue.subscribed);
    formValue.subscribed = subscribed;

    console.log("formValue");
    console.log(formValue);


    if (this.editEmailForm.valid) {
      if (this.editMode) {
        this.emailService.editEmail(emailId, formValue)
          .subscribe((result: any) => {
            console.log("updated result");
            console.log(result);
            this.router.navigate(["/admin/emails", result.id]);
          }, error => {
            console.log(error);
          });
      } else {
        this.emailService.createEmail(formValue)
          .subscribe((result: any) => {
            console.log("created result");
            console.log(result);
            this.router.navigate(["/admin/emails", result.id]);
          }, error => {
            console.log(error);
          })
      }
    }
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    if (this.emailSubscription != null) {
      this.emailSubscription.unsubscribe();
    }
  }
}
