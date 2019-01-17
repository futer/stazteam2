import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';

@Component({
  selector: 'app-edit-user-password',
  templateUrl: './edit-user-password.component.html',
  styleUrls: ['./edit-user-password.component.scss']
})
export class EditUserPasswordComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: AuthorizationDataService,
    ) { }

    user: IUser;
    editPasswordForm: FormGroup;
    passwordconfirm: string;

  ngOnInit() {
    this.user = { email: '', password: '', newpassword: '', confirmpassword: '' };
  }

  onChangeOldPassword(value) {
    this.user.password = value;
  }

  onChangeNewPassword(value) {
    this.user.newpassword = value;
  }

  onChangeConfirmPassword(value) {
    this.user.confirmpassword = value;
  }
}
