import { ActivatedRoute } from '@angular/router';
import { DocumentaryService } from './../../../../../services/documentary.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentary-show-standalone',
  templateUrl: './documentary-show-standalone.component.html',
  styleUrls: ['./documentary-show-standalone.component.css']
})
export class DocumentaryShowStandaloneComponent implements OnInit {

  private documentary;

  private queryParamsSubscription;

  constructor(
    private documentaryService: DocumentaryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.documentary = result[0];

      console.log("result[0]");
      console.log(result[0]);
    })
  }

}
