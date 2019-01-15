import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Login } from '../model/login.model';
import * as LoginActions from '../store/actions/login.actions';

interface AppState {
  login: Login;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Observable<Login>;

  logged: string;

  constructor(private router: Router,
    private store: Store<AppState>
    ) {
        this.login = this.store.select('login');
      }

  loginB() {
    this.store.dispatch(new LoginActions.Login(this.logged));
  }

  ngOnInit() {
  }

  getRegister() {
      this.router.navigate([`/register`]);
  }

  onSubmit() {
      this.router.navigate([`/dashboard`]);
  }
}