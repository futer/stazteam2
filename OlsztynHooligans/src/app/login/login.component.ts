import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService } from '../service/authorization-data.service';
import * as firebase from 'firebase/app';
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
  constructor(private router: Router,
    public dataService: AuthorizationDataService,
    private store: Store<AppState>) {
    this.login = this.store.select('login');
  }

  login: Observable<Login>;

  logged: string;

  ngOnInit() {
    this.user1 = { email: '', password: '' };
  }

  onChangeEmail(value) {
    this.user1.email = value;
  }

  onChangePassword(value) {
    this.user1.password = value;
  }

  getRegister() {
    this.router.navigate([`/register`]);
  }

  doFacebookLogin() {
    const newThis = this;
    const provider = new firebase.auth.FacebookAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const token = result.credential['accessToken'];
      newThis.dataService.postFacebook(token).subscribe(data => {
        firebase.auth().signInWithCustomToken(data.token).then(function () {
          newThis.store.dispatch(new LoginActions.Login(newThis.logged));
        });
      });
    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
  }

  doGoogleLogin() {
    const newThis = this;
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const token = result.credential['idToken'];
      newThis.dataService.postGoogle(token).subscribe(data => {
        firebase.auth().signInWithCustomToken(data.token).then(function () {
          newThis.store.dispatch(new LoginActions.Login(newThis.logged));
        });
      });
    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email);
    });
  }

  onSubmit() {
    const newThis = this;
    this.dataService.postusers(this.user1).subscribe(data => {
      firebase.auth().signInWithCustomToken(data.token).then(function (token) {
        newThis.store.dispatch(new LoginActions.Login(newThis.logged));
      });
    });
  }
}
