import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {User} from "../models/user.model";
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000'; // Replace with your actual backend URL

  constructor(
    private http: HttpClient,
    private cookieService: CookieService, // To retrieve token from cookies
    private router: Router
  ) {
  }

  /**
   * Get current logged-in user data from the server
   */
  getCurrentUser(): Observable<HttpResponse<User>> {
    // Retrieve the token from cookies
    const token = this.cookieService.get('jwt');


    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP GET request to get user data, observing the full response
    return this.http.get<User>(`${this.apiUrl}/user/user`, {
      headers,
      observe: 'response'
    });
  }

  getAllUsers(): Observable<User[]> {
    const token = this.cookieService.get('jwt');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<User[]>(`${this.apiUrl}/user/getall`, { headers });
  }


  updateProfile(userData: any, image?: File | null): Observable<HttpResponse<User>> {
    // Retrieve the token from cookies
    const token = this.cookieService.get('jwt');


    // Set the Authorization header with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const form= new FormData();
    for (const key in userData) {
      if(userData.hasOwnProperty(key)){
        form.append(key,userData[key])
      }
    }
    if(image!=null)
      form.append('image',image!);
    // Make HTTP GET request to get user data, observing the full response
    return this.http.put<User>(`${this.apiUrl}/user/update`, form,{
      headers,
      observe: 'response'
    });
  }




  /**
   * Log the user in and store the token in the cookies
   */
  login(email: string, password: string): Observable<any> {
    const jsonData = {email, password};

    return this.http.post<any>(`${this.apiUrl}/user/login`, jsonData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response'
    });
  }

  signUp(userData: User): Observable<any> {
    const jsonData = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      lastname: userData.lastname,

    };
    return this.http.post<any>(`${this.apiUrl}/user/register`, jsonData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  logout(): Observable<any> {

    const token = this.cookieService.get('jwt');

    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/user/logout`, null, {headers, withCredentials: true});
  }

  removeToken(): void {
    this.cookieService.delete('jwt');
    this.cookieService.delete('role');
  }
savetoken(token:any): void {
  this.cookieService.set('jwt', token, 1, '/');  // 1-day expiry

  }
  saverole(role:any): void {
  this.cookieService.set('role', role, 1, '/');  // 1-day expiry

  }

  istokeexist(): boolean {
    return this.cookieService.get('jwt') != null && this.cookieService.get('jwt') != '';
  }

  // test.service.ts
  deleteUser(userId: string): Observable<void> {
    console.log('start deleted:')
    const token = this.cookieService.get('jwt');
    console.log('Token récupéré:', token); // Pour le débogage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete<void>(`${this.apiUrl}/user/delete/${userId}`, { headers });
  }






}
