import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationDataService } from '../service/authorization-data.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthorizationDataService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      const newThis = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(true);
        } else {
          newThis.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}