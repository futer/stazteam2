import { Injectable } from '@angular/core';
import { IUser } from '../interface/interface.IUser';
import { IToken } from '../interface/interface.IToken';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {

  constructor(private http: HttpClient, public afAuth: AngularFireAuth) { }

    // Rejestracja -- POST
    postuser(data: IUser): Observable<any> {
      console.log(data);
      return this.http.post<IUser>(apiUrl + '/register', data).pipe();
    }

    postusers(user: IUser): Observable<IToken> {
      return this.http.post<IToken>(apiUrl + '/login', user).pipe();
    }

    signoutuser() {
      return this.http.get(apiUrl + '/login');
    }

}
