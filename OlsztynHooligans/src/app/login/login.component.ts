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
import { CorrectLogin } from '../helpers/correct-login.validator';


interface AppState {
  login: Login;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  userModel: IUser;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    public dataService: AuthorizationDataService,
    private store: Store<AppState>) {
    this.login = this.store.select('login');
  }

  login: Observable<Login>;
  userForm: FormGroup;
  logged: string;
  badlogindata: boolean;

  ngOnInit() {
    this.badlogindata = false;
    this.userModel = { email: '', password: '' };
    this.userForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
    });
  }

  get f() { return this.userForm.controls; }

  onChangeEmail(value) {
    this.userModel.email = value;
  }

  onChangePassword(value) {
    this.userModel.password = value;
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
          localStorage.setItem('user',  JSON.stringify(firebase.auth().currentUser));
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
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const token = result.credential['idToken'];
      newThis.dataService.postGoogle(token).subscribe(data => {
        firebase.auth().signInWithCustomToken(data.token).then(function () {
          localStorage.setItem('user',  JSON.stringify(firebase.auth().currentUser));
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
    this.badlogindata = false;

    this.userForm = this.formBuilder.group({
      'email': [this.userModel.email, [Validators.required, Validators.email]],
      'password': [this.userModel.password, [Validators.required]],
    });
    if (this.userForm.invalid) {
      return;
    }
    const newThis = this;
    this.dataService.postusers(this.userModel).subscribe(data => {
      console.log(data.user);
      if (data.user) {
        firebase.auth().signInWithCustomToken(data.user).then(function (token) {
          localStorage.setItem('user',  JSON.stringify(firebase.auth().currentUser));
          newThis.store.dispatch(new LoginActions.Login(newThis.logged));
        });
      } else {
        this.badlogindata = true;
      }
    });
  }
}
