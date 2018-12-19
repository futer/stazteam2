import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }
  changePassword(){
    this.router.navigate([`/editpassword`])
  }
  
}
