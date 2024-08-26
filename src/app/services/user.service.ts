import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHttpmsgService } from "./process-httpmsg.service";
import { baseURL } from "../shared/baseurl";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Email } from "../shared/email";
import { User } from "../shared/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService,
  ) {}

  getUser(email: string): Observable<User> {
    return this.http
      .get<User>(baseURL + "/user/" + email)
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  createUser(
    email: string,
    password: string,
    firstName: string,
  ): Observable<User> {
    return this.http
      .post<User>(baseURL + "/user/register/", { email, password, firstName })
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
