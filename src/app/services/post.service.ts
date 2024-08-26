import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProcessHttpmsgService } from "./process-httpmsg.service";
import { baseURL } from "../shared/baseurl";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { Post } from "../shared/post";

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(
    private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService,
  ) {}

  createPost(
    userId: string,
    blogId: string,
    title: string,
    text: string,
  ): Observable<Post> {
    return this.http
      .post<Post>(baseURL + "/post/create/", {
        userId,
        blogId,
        title,
        text,
      })
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  getPostsForUser(userId: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(baseURL + "/post/getForUser/" + userId, {})
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
