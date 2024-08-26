import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { User } from '../shared/user';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  user: Subject<User> = new Subject<User>();
  userDetail: User;
  firstname: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  saveemail: string;
  text: string;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
  ) {}

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + '/users/checkJWTtoken')
    .subscribe(res => {
      this.sendUsername(res.user);
    },
    err => {
      this.destroyUserCredentials();
    });
  }

  sendUsername(name: User) {
    this.user.next(name);
    this.userDetail = name;
  }

  clearUsername() {
    this.user.next(undefined);
    this.firstname.next(undefined);
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    if (credentials && credentials.email !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    }
  }

  storeUserCredentials(credentials: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp(name:string,email:string,password:string): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + '/users/signup',
      {'name': name, 'email': email, 'password': password})
      .pipe( map(res => {
        this.storeUserCredentials({firstname: name,
          email: email, token: res.token});
          return {'success': true, 'email': email };
        }),
      catchError(error => this.processHTTPMsgService.handleError(error))
    );
   }

   getSavedEmail() {
     return [this.saveemail, this.text]
   }

  logIn(email:string, password:string): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + '/users/login',
       {'email': email, 'password': password})
       .pipe( map(res => {
           this.storeUserCredentials({ email: email, token: res.token});
           return {'success': true, 'email': email };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     this.destroyUserCredentials();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername() {
     return this.user;
   }

   getToken(): string {
     return this.authToken;
   }
}