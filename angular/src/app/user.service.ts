import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from './user'
 
const httpOptions = { headers: new HttpHeaders({ 'Content-type' : 'application/json'}) };

@Injectable()
export class UserService {

  private userJSONURL = "http://localhost:4000/users";
  constructor(private http: HttpClient) { }

  getUser(id: number) : Observable<User>{
    const url = `${this.userJSONURL}/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User) : Observable<any>{
    return this.http.put(this.userJSONURL + '/1', user, httpOptions).pipe(
      catchError(this.handleError<any>(`updateUser`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // todo: send the error to remote loggin infrastructure
      console.error(error);
      // let the app keep running by returning an empty result
      return of(result as T);

    };
  }
}
