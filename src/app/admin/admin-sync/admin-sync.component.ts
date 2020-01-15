import { SyncService } from './../../services/sync.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sync',
  templateUrl: './admin-sync.component.html',
  styleUrls: ['./admin-sync.component.css']
})
export class AdminSyncComponent implements OnInit {

  constructor(
    private syncService: SyncService
  ) { }

  ngOnInit() {
    console.log("sync");
    this.syncService.sync();
  }

}
