import { DocumentaryService } from './../../../../../services/documentary.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentary-show-episodic',
  templateUrl: './documentary-show-episodic.component.html',
  styleUrls: ['./documentary-show-episodic.component.css']
})
export class DocumentaryShowEpisodicComponent implements OnInit {

  private documentary;

  private queryParamsSubscription;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.documentary = result[0];
      console.log("this.documentary");
      console.log(this.documentary);
    });
  }

}
