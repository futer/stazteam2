import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Login } from './model/login.model';
import * as LoginActions from './store/actions/login.actions';
import { AuthorizationDataService } from './service/authorization-data.service';
import * as firebase from 'firebase/app';

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

  constructor(private store: Store<AppState>,
    public authService: AuthorizationDataService) {
    this.login = this.store.select('login');
  }

  logout() {
    const newThis = this;
    this.authService.signoutuser().subscribe(() => {
      firebase.auth().signOut().then(function() {
        console.log('signout');
        localStorage.removeItem('user');
        newThis.store.dispatch(new LoginActions.Logout(newThis.logged));
      }).catch(function(error) {
        console.log('Not signout');
      });
    });
  }
}
