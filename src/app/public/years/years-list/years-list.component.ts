import { YearService } from 'src/app/services/year.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-years-list',
  templateUrl: './years-list.component.html',
  styleUrls: ['./years-list.component.css']
})
export class YearsListComponent implements OnInit {

  private yearsSubscription;
  
  private years;

  private isFetchingYears = false;
   
  constructor(
    private yearService: YearService
    ) { }

  ngOnInit() {
    this.fetchYears();
  }

  fetchYears() {
    this.isFetchingYears = true;

    this.yearsSubscription = this.yearService.getAllYears()
      .subscribe(result => {
        this.years = this.yearService.getColumnsForYears(result);

        this.isFetchingYears = false;
      })
  }
}
