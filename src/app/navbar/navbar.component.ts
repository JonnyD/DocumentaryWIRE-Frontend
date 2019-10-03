import { UserService } from './../services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  me = {};

  meSubscription;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    if (this.isAuthenticated) {
      this.meSubscription = this.userService.getMe()
        .subscribe(result => {
          this.me = result;
        })
    }
  }

}
