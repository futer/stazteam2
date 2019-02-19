import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Login } from './model/login.model';
import * as LoginActions from './store/actions/login.actions';
import { AuthorizationDataService } from './service/authorization-data.service';
import * as firebase from 'firebase/app';
import { NOTLOGGED} from './mock-navbar';
import { LOGGED } from './mock-navbar';
import { INavbar } from './interface/interface.INavbar';
import { Button } from 'protractor';

interface AppState {
  login: Login;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OlsztynHooligans';
  login: Observable<Login>;
  logged: string;
  tabLogged: INavbar[];
  tableLogged = LOGGED;
  tableNotLogged = NOTLOGGED;
  buttonLogout: boolean;


  constructor(private store: Store<AppState>,
    public authService: AuthorizationDataService) {
    this.loginState();
    this.login = this.store.select('login');
  }
  async loginState() {
    return new Promise(() => {
      const newThis = this;
      firebase.auth().onAuthStateChanged((user) => {
        newThis.tabLogged = user ? LOGGED : NOTLOGGED;
        newThis.buttonLogout = user ? true : false;
      });
    });
  }

  logout() {
    const newThis = this;
    this.authService.signoutuser().subscribe(() => {
      firebase.auth().signOut().then(function () {
        alert('Sign out');
        localStorage.removeItem('user');
        newThis.store.dispatch(new LoginActions.Logout(newThis.logged));
      }).catch(function (error) {
        alert('Not signout');
      });
    });
  }
}