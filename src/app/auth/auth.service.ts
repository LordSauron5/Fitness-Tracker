import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

import { AuthData } from "./auth-data.model";
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {

    constructor(
        private router: Router, 
        private afauth: AngularFireAuth, 
        private trainingService: TrainingService,
        private uiService: UIService,
        private store:Store<{ui: fromRoot.State}>
        ) {}

        initAuthListener() {
            this.afauth.authState.subscribe(user => {
                if (user) {
                    console.log("authentication confirm")
                    this.store.dispatch(new Auth.SetAuthenticated());
                    this.router.navigate(['/training']);
                } else {
                    console.log("authentication cancelled")
                    this.trainingService.cancelSubscriptions();
                    this.store.dispatch(new Auth.SetUnauthenticated());
                    this.router.navigate(['/login']);
                }
            });
        }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afauth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
        ).then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
        }).catch(error =>{
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    login(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});
        this.afauth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
        }).catch(error =>{
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({type: 'STOP_LOADING'});
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    logout() {
        this.afauth.signOut();
    }
}