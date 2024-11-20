// src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://andersonmovie-fda719d938ac.herokuapp.com/';

// using @Injectable to tell Angular
// that this service will be available everywhere(hence the root)
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // feedback1: To hold the latest user data
  private userDataSubject = new BehaviorSubject<any>(null);
  // feedback1: Observable for components to subscribe to
  userData$ = this.userDataSubject.asObservable();
  // feedback1: updateUserData()
  private updateUserData(): void {
    this.getUser().subscribe((userData) => {
      this.userDataSubject.next(userData); // Emit new user data
      localStorage.setItem('user', JSON.stringify(userData)); // Optionally update localStorage
    });
  }

  private handleError(error: HttpErrorResponse): any {
    console.error('Full error details:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: ${error.status}, Body: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  // I change here from (res: Response) to (res: any) to avoid an error
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }

  // Method to get username from localStorage
  private getUsername(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Extracted username:', user?.Username);
    return user?.Username || ''; // if username is invalid, return null
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log('Login payload:', userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map((response: any) => {
        // assume response includes token
        if (response.token) {
          // store token to localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user)); // it will include all uer's details
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get one movie
  public getOneMovies(movieId: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get director
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/director/${directorName}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genre
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get user
  public getUser(): Observable<any> {
    const username = this.getUsername();
    const headers = this.getAuthHeaders();
    console.log('Fetching user with Token:', headers.get('Authorization'));

    return this.http
      .get(`${apiUrl}users/${username}`, { headers })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get Favorite Movies for a User
  // The favorite movies' list is stored in user data, Here is not use fatch method
  // Consider to seperate this function to fit Single Responsibility Principle later
  public getFavoriteMovies(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // make 'user' to JSON object
    return user.FavMovies || []; // return `FavMovies`
  }

  // Add a movie to favourite Movies
  public addFavoriteMovie(movieId: string): Observable<any> {
    const username = this.getUsername();
    return this.http
      .post(
        apiUrl + `users/${username}/movies/${movieId}`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      )
      .pipe(
        map(
          // feedback1:
          // below is the original code
          // this.extractResponseData
          (response) => {
            this.updateUserData(); // Emit updated user data
            return response;
          }
        ),
        catchError(this.handleError)
      );
  }

  // Delete a Movie from Favorite Movies
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const username = this.getUsername();
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(
          // feedback1:
          // below is the original code
          // this.extractResponseData
          (response) => {
            this.updateUserData(); // Emit updated user data
            return response;
          }
        ),
        catchError(this.handleError)
      );
  }

  // Edit User Info
  public editUser(userDetails: any): Observable<any> {
    const username = this.getUsername();
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(
          // feedback1:
          // below is the original code
          // this.extractResponseData
          (response) => {
            this.updateUserData(); // Emit updated user data
            return response;
          }
        ),
        catchError(this.handleError)
      );
  }

  // Delete User
  public deleteUser(): Observable<any> {
    const username = this.getUsername();
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
