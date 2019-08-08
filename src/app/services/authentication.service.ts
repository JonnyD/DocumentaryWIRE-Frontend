import { Token } from './../models/token.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentTokenSubject: BehaviorSubject<Token>;
    public currentToken: Observable<Token>;

    constructor(private http: HttpClient) {
        this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
        this.currentToken = this.currentTokenSubject.asObservable();
    }

    public get currentTokenValue(): Token {
        return this.currentTokenSubject.value;
    }

    isAuthenticated() {
        return this.currentTokenSubject.value.access_token != null;
    }

    login(username: string, password: string) {
        var grantType = `${environment.grantType}`;
        var clientId = `${environment.clientId}`;
        var clientSecret = `${environment.clientSecret}`;

        return this.http.post<any>(`${environment.apiUrl}/oauth/v2/token`, 
        { 
            'username': username, 
            'password': password, 
            'grant_type': grantType, 
            'client_id': clientId, 
            'client_secret': clientSecret })
            .pipe(map(token => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentToken', JSON.stringify(token));
                this.currentTokenSubject.next(token);
                return token;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentToken');
        this.currentTokenSubject.next(null);
    }
}