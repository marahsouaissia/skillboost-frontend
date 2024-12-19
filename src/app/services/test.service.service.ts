import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TestModel } from "../models/test.model"; // Modèle Angular pour les tests
import { QuestionModel } from "../models/question.model"; // Modèle Angular pour les questions

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  private apiUrl = 'http://localhost:3000'; // URL de votre backend

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * Récupérer tous les tests avec leurs questions
   */
  getAllTests(): Observable<TestModel[]> {
    return this.http.get<TestModel[]>(`${this.apiUrl}/test/getAllTests`);
  }
getAllTestsbyid(id:any): Observable<TestModel> {
    return this.http.get<TestModel>(`${this.apiUrl}/test/getTestById/${id}`);
  }

  /**
   * Récupérer un test spécifique avec ses questions
   */
  getTestById(testId: string): Observable<TestModel> {
    return this.http.get<TestModel>(`${this.apiUrl}/test/getTestById/${testId}`);
  }

  /**
   * Créer un nouveau test avec ses questions
   */
  createTest(testData: any): Observable<HttpResponse<any>> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<HttpResponse<any>>(
      `${this.apiUrl}/test/createTest`,
      testData,
      { headers, observe: 'response' }
    );
  }

  /**
   * Ajouter une question à un test
   */
  addQuestionToTest(
    testId: string,
    questionData: QuestionModel
  ): Observable<HttpResponse<any>> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<HttpResponse<any>>(
      `${this.apiUrl}/test/addQuestion/${testId}`,
      questionData,
      { headers, observe: 'response' }
    );
  }

  /**
   * Supprimer une question
   */
  deleteQuestion(questionId: string): Observable<HttpResponse<any>> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete<HttpResponse<any>>(
      `${this.apiUrl}/test/deleteQuestion/${questionId}`,
      { headers, observe: 'response' }
    );
  }

  /**
   * Mettre à jour un test
   */
  updateTest(
    testId: string | undefined,
    testData: FormData
  ): Observable<HttpResponse<any>> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put<HttpResponse<any>>(
      `${this.apiUrl}/test/updateTest/${testId}`,
      testData,
      { headers, observe: 'response' }
    );
  }

  /**
   * Supprimer un test et ses questions associées
   */
  deleteTest(testId: string): Observable<HttpResponse<any>> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete<HttpResponse<any>>(
      `${this.apiUrl}/test/deleteTest/${testId}`,
      { headers, observe: 'response' }
    );
  }
}

