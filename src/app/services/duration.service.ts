import { HeaderAccessTokenService } from './../helpers/header-access-token.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DurationService {
    getAllDurations() {
        return [
            {
                "length": 4,
                "title": "Short",
                "display": "< 4 minutes",
                "greaterLessThanEquals": "lessThan"
            },
            {
                "length": 20,
                "title": "Medium Length",
                "display": "< 20 minutes",
                "greaterLessThanEquals": "lessThan"
            },
            {
                "length": 20,
                "title": "Long",
                "display": "> 20 minutes",
                "greaterLessThanEquals": "greaterThan"
            },
            {
                "length": 60,
                "title": "Longer",
                "display": "> 60 minutes",
                "greaterLessThanEquals": "greaterThan"
            }
        ]
    }

    getColumnsForDuration(duration) {
        let durationCount = 0;
        for (var key in duration) {
            durationCount++;
        }
    
        let half = Math.floor(durationCount / 2);
        let remainder = durationCount % half;
    
        let durationLeftColumnLength = half + remainder;
        let durationRightColumnLength = half;
    
        let durationLeftColumn = new Set();
        for (let i = 0; i < durationLeftColumnLength; i++) {
            durationLeftColumn.add(duration[i]);
        }
    
        let durationRighttColumn = new Set();
        for (let i = durationLeftColumnLength; i < (durationLeftColumnLength + durationRightColumnLength); i++) {
            durationRighttColumn.add(duration[i]);
        }
    
        let durationColumns = new Map();
        durationColumns.set('left', durationLeftColumn);
        durationColumns.set('right', durationRighttColumn);
    
        return durationColumns;
       }
}