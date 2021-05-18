import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED ='[AUTH] Set Authenticated';
export const SET_UNAUTHENTICATED ='[AUTH] Set Unauthenticated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;