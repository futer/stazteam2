import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interface/interface.IUser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthorizationDataService} from '../service/authorization-data.service';
import { AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { StorageServiceService } from '../service/storage-service.service';
import { MustMatch } from '../helpers/must-match.validator';
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

  userModel: IUser;
  userForm: FormGroup;
  // passwordconfirm: string;
  selectedFile: File;

  ngOnInit() {
    this.userModel = { email: '', password: '', name: '', surname: '', image: '', confirmpassword: '', };
    // this.passwordconfirm = '';
    this.userForm = this.formBuilder.group({
      'email': [''],
      'password': [''],
      'name': [''],
      'surname': [''],
      'confirmpassword': [''],
    });
  }

  // eventEmitter function

  onChangeEmail(value) {
    console.log(this.userModel.email);
    this.userModel.email = value;
  }

  onChangeName(value) {
    console.log(this.userModel.name);
    this.userModel.name = value;
  }

  onChangeSurname(value) {
    console.log(this.userModel.surname);
    this.userModel.surname = value;
  }

  onChangePassword(value) {
    console.log(this.userModel.password);
    this.userModel.password = value;
  }

  onChangePassword2(value) {
    console.log(this.userModel.confirmpassword);
    this.userModel.confirmpassword = value;
  }

  upload(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  // Used in validation
  get f() { return this.userForm.controls; }

  onSubmit() {


    this.userForm = this.formBuilder.group({
      'email': [this.userModel.email, [Validators.required, Validators.maxLength(30), Validators.email, ]],
      'name': [this.userModel.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'surname': [this.userModel.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      'password': [this.userModel.password, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'confirmpassword': [this.userModel.confirmpassword, Validators.required, ]
    }, {
      validator: MustMatch('password', 'confirmpassword')
  });

    if (this.userForm.invalid) {
      return;
    }

    if (this.userModel.password === this.userModel.confirmpassword) {
      this.storage.pushUpload(this.selectedFile);
      this.userModel.image = this.storage.image;
      this.dataService.postuser(this.userModel).subscribe(res => {
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });

    }
  }
}
