import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmitAnswersRequest } from '../models/answer.model';
import {CookieService} from "ngx-cookie-service";
import {TestModel} from "../models/test.model";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:3000/answer';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Submit answers
  submitAnswers( data: SubmitAnswersRequest): Observable<any> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/submit`, data, { headers });
  }
 getscore(): Observable<any> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

   return this.http.get<any>(`${this.apiUrl}/user/tests`, { headers });

  }
}
