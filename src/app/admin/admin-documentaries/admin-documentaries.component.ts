import { DocumentaryService } from './../../services/documentary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-documentaries',
  templateUrl: './admin-documentaries.component.html',
  styleUrls: ['./admin-documentaries.component.css']
})
export class AdminDocumentariesComponent implements OnInit, OnDestroy {
  private documentariesSubscription;
  public documentaries;

  constructor(private service: DocumentaryService) { }

  ngOnInit() {
    this.documentariesSubscription = this.service.getAll()
    .subscribe(
        result => {
          this.documentaries = result['items'];
          console.log(result);
        }
    );
  }

  ngOnDestroy() {
    this.documentariesSubscription.unsubscribe();
  }

}
