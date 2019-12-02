import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class StatusService extends DataService {
   
   getAllStatuses() {
    return [
        {
          value: 'pending',
          name: 'Pending'
        },
        {
          value: 'publish',
          name: 'Published'
        }
      ];
   }
}