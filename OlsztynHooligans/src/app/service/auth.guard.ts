import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
          console.log('a');
          resolve(true);
        } else {
          console.log('b');
          newThis.router.navigate(['/login']);
          resolve(false);
        }
      });
      // firebase.auth().onAuthStateChanged((user: firebase.User) => {
      //   if (user) {
      //     console.log('a');
      //     resolve(true);
      //   } else {
      //     console.log('b');
      //     this.router.navigate(['/login']);
      //     resolve(false);
      //   }
      // });
    });
  }
}
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.authService.authState$.pipe(map(state => {
  //       if (state !== null) {
  //         this.router.navigate(['/dashboard']);
  //         return true;
  //       } else {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
  //       }
  //     )
  //   );
  // }
