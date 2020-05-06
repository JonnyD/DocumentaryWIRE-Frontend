import { DurationService } from './../../../services/duration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duration-list',
  templateUrl: './duration-list.component.html',
  styleUrls: ['./duration-list.component.css']
})
export class DurationListComponent implements OnInit {

  private duration;

  private isFetchingDuration = false;

  constructor(
    private durationService: DurationService
    ) { }

  ngOnInit() {
    this.fetchDuration();
  }

  fetchDuration() {
    this.isFetchingDuration = true;

    let duration = this.durationService.getAllDurations();
    this.duration = this.durationService.getColumnsForDuration(duration);

    this.isFetchingDuration = false;
  }

}
