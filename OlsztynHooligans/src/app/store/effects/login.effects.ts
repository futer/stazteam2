import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login, ActionTypes } from '../actions/login.actions';

@Injectable()
export class LoginEffects {

  constructor(private actions$: Actions, private router: Router) { }
    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(ActionTypes.Login),
        tap(() => this.router.navigate(['/dashboard']))
    );
}