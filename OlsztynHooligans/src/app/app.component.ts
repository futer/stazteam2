import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Login } from './model/login.model';
import * as LoginActions from './store/actions/login.actions';
import { AuthorizationDataService } from './service/authorization-data.service';
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

  constructor(private store: Store<AppState>, public authService: AuthorizationDataService) {
    this.login = this.store.select('login');
  }

  logout() {
    this.authService.signoutuser().subscribe(() => {
      this.store.dispatch(new LoginActions.Logout(this.logged));
    });
  }
}
