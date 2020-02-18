import { SEOService } from './../../services/seo.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private seoService: SEOService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.seoService.setPageTitle('Logout | DocumentaryWIRE');

    this.authenticationService.logout();
    window.location.replace("/");
    this.router.navigate(['/']);
    
  }

}
