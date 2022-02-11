import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://oscarsmyflixapp.herokuapp.com/';

const token = localStorage.getItem('token');

const username = localStorage.getItem('user');
export interface User {
  _id: string;
  FavoriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getSingleMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUserProfile(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    // const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/` + Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getFavoriteMovies(): Observable<any> {
    // this was not an endpoint previous established, unsure if it will work
    return this.http.get(apiUrl + `users/${username}/Favorites`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavoriteMovies(): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/Favorites/:MovieId`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFavoriteMovies(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/Favorites/:movieId`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUserProfile(): Observable<any> {
    return this.http.put(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUserProfile(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor(private http: HttpClient) {
  }
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something went wrong with the login process; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {
  }
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something went wrong loading the movie collection; please try again later.');
  }
}

// export class GetSingleMovieService {
//   constructor(private http: HttpClient) {
//   }
//   getSingleMovie(): Observable<any> {
//     return this.http.get(apiUrl + 'movies/:title', {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not load the requested movie; please try again later.');
//   }
// }

// export class GetDirectorService {
//   constructor(private http: HttpClient) {
//   }
//   getDirector(): Observable<any> {
//     return this.http.get(apiUrl + 'directors/:name', {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not load the director details; please try again later.');
//   }
// }

// export class GetGenreService {
//   constructor(private http: HttpClient) {
//   }
//   getGenre(): Observable<any> {
//     return this.http.get(apiUrl + 'movies/genre/:title', {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not load the genre details; please try again later.');
//   }
// }

// export class GetUserProfileService {
//   constructor(private http: HttpClient) {
//   }
//   getUserProfile(): Observable<any> {
//     return this.http.get(apiUrl + `users/${username}`, {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not load the user profile; please try again later.');
//   }
// }

// export class GetFavoriteMoviesService {
//   constructor(private http: HttpClient) {
//   }
//   getFavoriteMovies(): Observable<any> {
//     // this was not an endpoint previous established, unsure if it will work
//     return this.http.get(apiUrl + `users/${username}/Favorites`, {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not load the favorite movies collection; please try again later.');
//   }
// }

// export class AddFavoriteMoviesService {
//   constructor(private http: HttpClient) {
//   }
//   addFavoriteMovies(): Observable<any> {
//     return this.http.post(apiUrl + `users/${username}/Favorites/:MovieId`, {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not add the selected movie to the favorites collection; please try again later.');
//   }
// }

// export class DeleteFavoriteMoviesService {
//   constructor(private http: HttpClient) {
//   }
//   deleteFavoriteMovies(): Observable<any> {
//     return this.http.delete(apiUrl + `users/${username}/Favorites/:movieId`, {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not remove the selected movie from the favorites collection; please try again later.');
//   }
// }

// export class EditUserProfileService {
//   constructor(private http: HttpClient) {
//   }
//   editUserProfile(): Observable<any> {
//     return this.http.put(apiUrl + `users/${username}`, {
//       headers: new HttpHeaders(
//         {
//           Authorization: 'Bearer ' + token,
//         })
//     }).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Could not updated the user profile; please try again later.');
//   }
// }
@Injectable({
  providedIn: 'root'
})
export class DeleteUserProfileService {
  constructor(private http: HttpClient) {
  }
  deleteUserProfile(): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Could not remove the user profile; please try again later.');
  }
}

export class FetchApiDataService {
  constructor() { }
}

