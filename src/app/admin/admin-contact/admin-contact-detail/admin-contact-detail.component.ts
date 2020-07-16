import { Contact } from './../../../models/contact.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-contact-detail',
  templateUrl: './admin-contact-detail.component.html',
  styleUrls: ['./admin-contact-detail.component.css']
})
export class AdminContactDetailComponent implements OnInit {

  private contact;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.contact = <Contact> result[0];
    })
  }
}
