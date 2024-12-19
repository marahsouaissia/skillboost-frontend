import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CvService {

  private apiUrl = 'http://localhost:3000'; // Replace with your actual backend URL

  constructor(
    private http: HttpClient,
    private cookieService: CookieService, // To retrieve token from cookies
    private router: Router
  ) {
  }
  getAllCvs(): Observable<any[]> {
    // Récupérer le token JWT depuis les cookies
    const token = this.cookieService.get('jwt');

    // Ajouter l'en-tête Authorization avec le token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/cv/get_my_cvs`,{headers});
  }

  updateCv(file: File): Observable<HttpResponse<any>> {
    // Récupérer le token JWT depuis les cookies
    const token = this.cookieService.get('jwt');

    // Ajouter l'en-tête Authorization avec le token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('file', file); // Ajouter le fichier au FormData

    // Effectuer une requête HTTP PUT pour mettre à jour le fichier PDF du CV
    return this.http.put<any>(`${this.apiUrl}/cv/update`, formData, {
      headers,
      observe: 'response' // Observer la réponse complète
    });
  }
}
