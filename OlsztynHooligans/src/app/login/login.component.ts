import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user1: IUser;
  constructor(private router: Router, private dataService: AuthorizationDataService) { }

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
    });
      this.router.navigate([`/dashboard`]);
  }
}
