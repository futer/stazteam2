import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Login } from './model/login.model';
import * as LoginActions from './store/actions/login.actions';

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

  constructor (private store: Store<AppState>) {
    this.login = this.store.select('login');
  }
  logout() {
    this.store.dispatch(new LoginActions.Logout(this.logged));
  }
}
