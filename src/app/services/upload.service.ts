import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Image } from '../shared/image';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient,
    private ProcessHttpmsgService: ProcessHttpmsgService) { }

  postImage(files, userId, restaurantId): Observable<Image> {
    return this.http.post<Image>(baseURL + 'upload', {files, userId, restaurantId})  
    .pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
