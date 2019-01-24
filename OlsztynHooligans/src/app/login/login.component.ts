import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';


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


  user1: IUser;
  constructor(private router: Router, private dataService: AuthorizationDataService, private store: Store<AppState>) {
    this.login = this.store.select('login');
   }

  login: Observable<Login>;

  logged: string;


  loginB() {
    this.store.dispatch(new LoginActions.Login(this.logged));
  }

  ngOnInit() {
    this.user1 = {email: '', password: '' };
  }

  onChangeEmail(value) {
    console.log(this.user1.email);
    this.user1.email = value;
  }

  onChangePassword(value) {
    console.log(this.user1.password);
    this.user1.password = value;
  }

  getRegister() {
      this.router.navigate([`/register`]);
  }

  onSubmit() {
    this.dataService.postusers(this.user1).subscribe(data => {
      console.log(data);
      this.router.navigate([`/dashboard`]);
    });
  }
}
