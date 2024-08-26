import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { map, catchError } from "rxjs/operators";
import { ProcessHttpmsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  constructor(
    private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService
  ) {}

  sendPostReviewEmail(
    emailAddress: string,
    restaurantId: string,
    restaurantName: string,
    reviewId: string
  ) {
    return this.http
      .post(baseURL + "/email/sendReviewConfirmation", {
        emailAddress,
        restaurantId,
        restaurantName,
        reviewId,
      })
      .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
