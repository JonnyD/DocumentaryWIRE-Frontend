import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loc;

  title = 'DocumentaryWIRE';

  ngOnInit() {
    this.loc = 78 + 21 + 54 + 70 + 82 + 125 + 38 + 35 + 
      58 + 59 + 22 + 29 + 55 + 20 + 46 + 55 + 48 + 128 + 
      36 + 21 + 33 + 70 + 157 + 166 + 161 + 27 + 121 + 
      34 + 107 + 29 + 267 + 555 + 135 + 206 + 25 + 103 + 
      35 + 40 + 68 + 115 + 35 + 93 + 32 + 52 + 91 + 130 + 
      28 + 88 + 66 + 35 + 25 + 73 + 67 + 22 + 28 + 39 + 
      28 + 48 + 96 + 26 + 11 + 5 + 13 + 3 + 7 + 25 + 7 + 
      2 + 2 + 16 + 3 + 5 + 3 + 3 + 3 + 3 + 6 + 3 + 13 + 
      6 + 2 + 63 + 37 + 52 + 89 + 53 + 100 + 13 + 40 + 
      40 + 111 + 42 + 76 + 87 + 36 + 50 + 117 + 29 + 
      467 + 880 + 57 + 30 + 315 + 605 + 12 + 43 + 11 + 
      69 + 11 + 69 + 18 + 68 + 11 + 69 + 18 + 68 + 11 + 
      32 + 55 + 96 + 150 + 37 + 8 + 34 + 12 + 76 + 11 + 
      34 + 81 + 45 + 64 + 36 + 14 + 64 + 83 + 44 + 87 +
      26 + 77 + 26 + 74 + 48 + 108 + 25 + 70 + 25 + 65 + 
      25 + 77 + 52 + 23 + 14 + 44 + 98 + 115 + 58 + 114 + 
      58 + 117 + 148 + 163 + 44 + 85 + 9 + 34 + 35 + 20 + 
      87 + 20 + 20 + 50 + 20 + 97 + 20 + 85 + 26 + 20 + 
      42 + 90 + 20 + 320 + 90 + 20 + 95 + 20 + 50 + 20  + 
      50 + 50 + 90 + 20 + 200 + 20 + 65 + 20 + 50 + 20 + 
      70 + 50 + 320 + 130;
  }
}
