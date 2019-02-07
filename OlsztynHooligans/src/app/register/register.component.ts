import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { StorageServiceService } from '../service/storage-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dataService: AuthorizationDataService,
    private storage: StorageServiceService,
    private afStorage: AngularFireStorage) { }

  user1: IUser;
  userForm: FormGroup;
  passwordconfirm: string;
  selectedFile: File;

  ngOnInit() {
    this.user1 = { email: '', password: '', name: '', surname: '', image: '' };
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

  upload(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  // Used in validation
  get f() { return this.userForm.controls; }

  onSubmit() {


    this.userForm = this.formBuilder.group({
      'email': [this.user1.email, [Validators.required, Validators.maxLength(30), Validators.email, ]],
      'password': [this.user1.password, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'passwordconfirm': [this.passwordconfirm, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
    if (this.user1.password === this.passwordconfirm) {
      this.storage.pushUpload(this.selectedFile);
      this.user1.image = this.storage.image;
      this.dataService.postuser(this.user1).subscribe(res => {
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });

    }
  }
}
