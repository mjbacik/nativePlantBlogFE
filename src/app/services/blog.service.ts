import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHttpmsgService } from "./process-httpmsg.service";
import { baseURL } from "../shared/baseurl";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Blog } from "../shared/blog";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  constructor(
    private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService,
  ) {}

  getAll(): Observable<Blog[]> {
    return this.http
      .get<Blog[]>(baseURL + "/blog/getAll/")
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http
      .get<Blog>(baseURL + "/blog/blog/" + id)
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
