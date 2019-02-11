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

    postFacebook(token: string): Observable<IToken> {
      console.log(token);
      const data = {
        token: token
      };
      return this.http.post<IToken>(apiUrl + '/loginfacebook', data).pipe();
    }

    postGoogle(token: string): Observable<IToken> {
      console.log(token);
      const data = {
        token: token
      };
      return this.http.post<IToken>(apiUrl + '/logingoogle', data).pipe();
    }

    updateuser(data): Observable<any> {
      const url = `${apiUrl}/edit`;
      return this.http.put(url, data).pipe();
    }

    updatepassword(data): Observable<any> {
      const url = `${apiUrl}/editpassword`;
      return this.http.put(url, data).pipe();
    }

    signoutuser() {
      return this.http.get(apiUrl + '/login');
    }
}
