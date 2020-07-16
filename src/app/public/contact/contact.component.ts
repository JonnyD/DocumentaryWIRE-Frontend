import { ContactService } from './../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = new FormGroup({
      'subject': new FormControl('', Validators.required),
      'emailAddress': new FormControl('', [Validators.required, Validators.email]),
      'message': new FormControl('', Validators.required),
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    let formValue = this.contactForm.value;
    console.log("formValue");
    console.log(formValue);
    this.contactService.createContact(formValue)
      .subscribe((result: any) => {
        console.log(result);
        }),
      (error) => {
        console.log(error.error);
      }
  }
}
