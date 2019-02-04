import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: AuthorizationDataService,
    ) { }

  user1: IUser;
  editForm: FormGroup;

  ngOnInit() {
    this.user1 = { email: '', name: '', password: '', surname: '' };
  }

  onChangeEmail(value) {
    this.user1.email = value;
  }

  onChangeName(value) {
    this.user1.name = value;
  }

  onChangeSurname(value) {
    this.user1.surname = value;
  }
  get f() { return this.userForm.controls; }

  onSubmit(form) {
    this.userForm = this.formBuilder.group({
      'email': [this.user1.email, [Validators.required, Validators.maxLength(30)]],
      'name': [this.user1.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],    });
      this.dataService.updateuser(this.user1)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        }, (err) => {
          console.log(err);
        });
    }
  changePassword() {
    this.router.navigate([`/editpassword`]);
  }
}