import { Action } from '@ngrx/store';

export enum ActionTypes {
    Login = '[LOGIN] Login',
    Logout = '[LOGIN] Logout',
}

export class Login implements Action {
    readonly type = ActionTypes.Login;
    constructor(public payload: string) {}
}
export class Logout implements Action {
    readonly type = ActionTypes.Logout;
    constructor(public payload: string) {}
}

export type ActionsUnion = Login | Logout;
