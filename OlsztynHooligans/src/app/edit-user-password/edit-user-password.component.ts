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
  userForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: AuthorizationDataService,
    ) { }

    user: IUser;
    editPasswordForm: FormGroup;

  ngOnInit() {
    this.user = {  password: '', newpassword: '', confirmpassword: '' };
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

  get f() { return this.userForm.controls; }

  onSubmit(form) {
    console.log('asas');
    this.userForm = this.formBuilder.group({
      'password': [this.user.password, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'newpassword': [this.user.newpassword, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'confirmpassword': [this.user.confirmpassword, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
    if (this.user.newpassword === this.user.confirmpassword) {
      this.dataService.updatepassword(this.user)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        }, (err) => {
          console.log(err);
        });
    }
  }
}