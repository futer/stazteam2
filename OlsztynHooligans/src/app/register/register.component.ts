import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private dataService: AuthorizationDataService) { }

  user1: IUser;
  userForm: FormGroup;
  email: string;
  password: string;
  passwordconfirm: string;

  ngOnInit() {
    this.user1 = { email: '', password: '', name: '', surname: '' };
    this.passwordconfirm = '';
    this.userForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
      'name': [''],
      'surname': ['']
    });
  }

  // eventEmitter function

  onChangeEmail(value) {
    console.log(this.user1.email);
    this.user1.email = value;
  }

  onChangeName(value) {
    console.log(this.user1.name);
    this.user1.name = value;
  }

  onChangeSurname(value) {
    console.log(this.user1.surname);
    this.user1.surname = value;
  }

  onChangePassword(value) {
    console.log(this.user1.password);
    this.user1.password = value;
  }

  onChangePassword2(value) {
    console.log(this.passwordconfirm);
    this.passwordconfirm = value;
  }
  // Used in validation
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.router.navigate([`/login`]);
  }
}
