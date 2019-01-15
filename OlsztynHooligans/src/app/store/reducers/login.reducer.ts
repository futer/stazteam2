import * as LoginActions from '../actions/login.actions';
import { Login } from '../../model/login.model';

export type Action = LoginActions.ActionsUnion;

export const initialState: Login = {
    logged: '',
};

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};

export function loginReducer(state: Login = initialState, action: Action) {
    console.log(action.type, state);

    switch (action.type) {
        case LoginActions.ActionTypes.Login:
            return newState(state, {logged: 'true'});
        case LoginActions.ActionTypes.Logout:
            return newState(state, {logged: 'false'});
        default: {
            return state;
        }
    }
}