import { Injectable } from '@angular/core';
import { IUser } from '../interface/interface.IUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {

  constructor(private http: HttpClient) { }

    // Rejestracja -- POST
    postuser(data: IUser): Observable<any> {
      console.log(data);
      return this.http.post<IUser>(apiUrl + '/register', data).pipe();
    }
}
