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

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: AuthorizationDataService,
    ) { }

  user1: IUser;
  editForm: FormGroup;

  ngOnInit() {
    this.user1 = { email: '', password: '', name: '', surname: '' };
  }

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

  changePassword() {
    this.router.navigate([`/editpassword`]);
  }
}
